using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using Chess.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace Chess.AI;

public static class ArtificalIntelligence
{
    public static Move GetRandomMove(IList<Move> moves)
    {
        if (moves != null && moves.Any())
        {
            var choosen = Randomize.Next(moves.Count);
            return moves[choosen];
        }

        return null;
    }

    public static bool CheckWhenEnemyHasNoMove(ChessTable chessTable, FigureValueCalculator figureValueCalculator, Move move, IList<MoveWithGainInfo> goodMoves)
    {
        Contract.Requires(chessTable != null && move != null && goodMoves != null && figureValueCalculator != null);

        if (chessTable.IsEnemyInCheck(move.To))
        {
            goodMoves.Clear();
            goodMoves.Add(new MoveWithGainInfo(move, Double.MaxValue)); // CheckMate
            return true;
        }
        var whiteFiguresValue = chessTable.Squares.GetWhiteFiguresValue(figureValueCalculator.FigureValueCalculationMode);
        var blackFiguresValue = chessTable.Squares.GetBlackFiguresValue(figureValueCalculator.FigureValueCalculationMode);
        
        var diff = move.To.State.HasWhiteFigure() ?
            whiteFiguresValue - blackFiguresValue :
            blackFiguresValue - whiteFiguresValue;
        if (diff < 0)
        {
            goodMoves.Add(new MoveWithGainInfo(move, Math.Abs(diff))); // Tie (but it seems a possible good move)
        }

        return false;
    }

    public static double GetMoveGain(ChessTable chessTable, FigureValueCalculator figureValueCalculator, Move goodMove, Move enemyMove)
    {
        Contract.Requires(chessTable != null && figureValueCalculator != null && goodMove != null && enemyMove != null);

        var gain = figureValueCalculator.GetValue(goodMove.CapturedFigure) ?? 0;
        if (goodMove.IsEnemyInCheck && goodMove.To != enemyMove.To)
        {
            gain += figureValueCalculator.GetCheckValue();
        }

        var enemyGain = figureValueCalculator.GetValue(enemyMove.To.State) ?? 0;
        var myGain = gain - enemyGain;
        return myGain;
    }

    public static MoveDecisionHelper GetGoodMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, Func<ChessTable, Move> enemyMoveProvider, bool breakOnCheckMate, Func<Move, bool> movePreFilterPredicate = null)
    {
        Contract.Requires(chessTable != null);

        var validMoves = chessTable.GetValidMoves();
        if (!validMoves.Any())
        {
            return new MoveDecisionHelper(validMoves, new List<MoveWithGainInfo>());
        }

        var winnerMoves = validMoves.Where(validMove => validMove.IsEnemyInCheckMate);
        if (winnerMoves.Any())
        {
            return new MoveDecisionHelper(validMoves, winnerMoves.Select(winnerMove => new MoveWithGainInfo(winnerMove, Double.MaxValue)).ToList());
        }

        var movesToConsider = movePreFilterPredicate == null ? validMoves : validMoves.Where(movePreFilterPredicate);

        var goodMovesWithGainInfo = GetGoodMoves(chessTable, figureValueCalculator, movesToConsider, enemyMoveProvider, breakOnCheckMate);
        return new MoveDecisionHelper(validMoves, goodMovesWithGainInfo);
    }

    public static Move GetMove(ChessTable chessTable, Delegates.MoveDecisionHelperCallback moveDecisionHelperCallback, FigureValueCalculator figureValueCalculator)
    {
        var validMoves = chessTable.GetValidMoves();
        var winnerMoves = new List<Move>();
        var veryGoodMoves = new List<Move>();
        var goodMoves = new List<Move>();
        var noMoronMoves = new List<Move>(validMoves);

        if (validMoves.Any())
        {
            Parallel.ForEach(validMoves, validMove =>
            {
                var clonedTable = (ChessTable)chessTable.Clone();
                var clonedMove = validMove.Clone(clonedTable);
                var moveEvaluateResult = clonedMove.EvaluateMove(clonedTable, moveDecisionHelperCallback, figureValueCalculator);

                switch (moveEvaluateResult)
                {
                    case MoveEvaluationResult.Bad:
                        noMoronMoves.Remove(validMove);
                        break;

                    case MoveEvaluationResult.Good:
                        goodMoves.Add(validMove);
                        break;

                    case MoveEvaluationResult.WinInTwoMoves:
                        veryGoodMoves.Add(validMove);
                        break;

                    case MoveEvaluationResult.Winner:
                        winnerMoves.Add(validMove);
                        break;

                    case MoveEvaluationResult.Unknown:
                    case MoveEvaluationResult.Questionable:
                    case MoveEvaluationResult.Neutral:
                    default:
                        break;
                }
            });
        }

        return GetRandomMove(winnerMoves) ?? GetRandomMove(veryGoodMoves) ?? GetRandomMove(goodMoves) ?? GetRandomMove(noMoronMoves) ?? GetRandomMove(validMoves);
    }

    private static IList<MoveWithGainInfo> GetGoodMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, IEnumerable<Move> movesToConsider, Func<ChessTable, Move> enemyMoveProvider, bool breakOnCheckMate)
    {
        Contract.Requires(chessTable != null && enemyMoveProvider != null);

        var goodMovesWithGainInfo = new List<MoveWithGainInfo>();
        foreach (var move in movesToConsider)
        { 
            move.Execute(chessTable, true, false);            

            var enemyMove = enemyMoveProvider(chessTable);
            if (enemyMove == null)
            {
                if (CheckWhenEnemyHasNoMove(chessTable, figureValueCalculator, move, goodMovesWithGainInfo))
                {
                    if (breakOnCheckMate)
                    {
                        move.Rollback(chessTable, true, false);
                        break;
                    }
                }
            }
            else
            {
                var myGain = GetMoveGain(chessTable, figureValueCalculator, move, enemyMove);
                if (myGain >= 0)
                {
                    goodMovesWithGainInfo.Add(new MoveWithGainInfo(move, myGain));
                }

            }

            move.Rollback(chessTable, true, false);
        }

        return goodMovesWithGainInfo;
    }
}