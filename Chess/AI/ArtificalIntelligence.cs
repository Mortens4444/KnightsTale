using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using Chess.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

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

    public static bool CheckWhenEnemyHasNoMove(ChessTable chessTable, FigureValueCalculator figureValueCalculator, MoveWithDestinationSquareInfo myMove, IList<MoveWithGainInfo> goodMoves)
    {
        Contract.Requires(chessTable != null && myMove != null && goodMoves != null && figureValueCalculator != null);

        if (chessTable.IsEnemyInCheck(myMove.ValidMove.To))
        {
            goodMoves.Clear();
            goodMoves.Add(new MoveWithGainInfo(myMove.ValidMove, Double.MaxValue)); // CheckMate
            return true;
        }
        var whiteFiguresValue = chessTable.Squares.GetWhiteFiguresValue(figureValueCalculator.FigureValueCalculationMode);
        var blackFiguresValue = chessTable.Squares.GetBlackFiguresValue(figureValueCalculator.FigureValueCalculationMode);
        
        var diff = myMove.ValidMove.To.State.HasWhiteFigure() ?
            whiteFiguresValue - blackFiguresValue :
            blackFiguresValue - whiteFiguresValue;
        if (diff < 0)
        {
            goodMoves.Add(new MoveWithGainInfo(myMove.ValidMove, Math.Abs(diff))); // Tie (but it seems a possible good move)
        }

        return false;
    }

    public static double GetMoveGain(ChessTable chessTable, FigureValueCalculator figureValueCalculator, MoveWithDestinationSquareInfo goodMove, Move enemyMove)
    {
        Contract.Requires(chessTable != null && figureValueCalculator != null && goodMove != null && enemyMove != null);

        var gain = figureValueCalculator.GetValue(goodMove.ValidMove.CapturedFigure) ?? 0;
        if (goodMove.ValidMove.IsEnemyInCheck && goodMove.To != enemyMove.To)
        {
            gain += 10;
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
        var veryGoodMoves = new List<Move>();
        var goodMoves = new List<Move>();
        var noMoronMoves = new List<Move>(validMoves);

        if (validMoves.Any())
        {
            foreach (var validMove in validMoves)
            {
                var moveEvaluateResult = validMove.EvaluateMove(chessTable, moveDecisionHelperCallback, figureValueCalculator);

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
                        return validMove;

                    case MoveEvaluationResult.Unknown:
                    case MoveEvaluationResult.Questionable:
                    case MoveEvaluationResult.Neutral:
                    default:
                        break;
                }
            }
        }

        return GetRandomMove(veryGoodMoves) ?? GetRandomMove(goodMoves) ?? GetRandomMove(noMoronMoves) ?? GetRandomMove(validMoves);
    }

    private static IList<MoveWithGainInfo> GetGoodMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, IEnumerable<Move> movesToConsider, Func<ChessTable, Move> enemyMoveProvider, bool breakOnCheckMate)
    {
        Contract.Requires(chessTable != null && enemyMoveProvider != null);

        IEnumerable<MoveWithDestinationSquareInfo> moves = movesToConsider
            .Select(validMove => new MoveWithDestinationSquareInfo { ValidMove = validMove, To = validMove.To });

        var goodMovesWithGainInfo = new List<MoveWithGainInfo>();
        foreach (var move in moves)
        { 
            move.ValidMove.Execute(chessTable, true, false);            

            var enemyMove = enemyMoveProvider(chessTable);
            if (enemyMove == null)
            {
                if (CheckWhenEnemyHasNoMove(chessTable, figureValueCalculator, move, goodMovesWithGainInfo))
                {
                    if (breakOnCheckMate)
                    {
                        move.ValidMove.Rollback(chessTable, true, false);
                        break;
                    }
                }
            }
            else
            {
                var myGain = GetMoveGain(chessTable, figureValueCalculator, move, enemyMove);
                if (myGain >= 0)
                {
                    goodMovesWithGainInfo.Add(new MoveWithGainInfo(move.ValidMove, myGain));
                }

            }

            move.ValidMove.Rollback(chessTable, true, false);
        }

        return goodMovesWithGainInfo;
    }
}