using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using Chess.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI
{
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
            
            var diff = chessTable.Squares[myMove.ValidMove.To].State.HasWhiteFigure() ?
                whiteFiguresValue - blackFiguresValue :
                blackFiguresValue - whiteFiguresValue;
            if (diff < 0)
            {
                goodMoves.Add(new MoveWithGainInfo(myMove.ValidMove, Math.Abs(diff))); // Tie (but it seems a possible good move)
            }

            return false;
        }

        public static void AddGoodMove(ChessTable chessTable, FigureValueCalculator figureValueCalculator, IList<MoveWithGainInfo> goodMoves, MoveWithDestinationSquareInfo goodMove, Move enemyMove)
        {
            Contract.Requires(chessTable != null && figureValueCalculator != null && goodMoves != null && goodMove != null && enemyMove != null);

            var gain = figureValueCalculator.GetValue(goodMove.ValidMove.CapturedFigure) ?? 0;
            var enemyGain = figureValueCalculator.GetValue(chessTable.Squares[enemyMove.To].State) ?? 0;
            var myGain = gain - enemyGain;
            if (myGain >= 0)
            {
                goodMoves.Add(new MoveWithGainInfo(goodMove.ValidMove, myGain));
            }
        }

        public static MoveDecisionHelper GetGoodMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, Func<ChessTable, Move> enemyMoveProvider, bool breakOnCheckMate, Func<Move, bool> movePreFilterPredicate = null)
        {
            Contract.Requires(chessTable != null);

            var validMoves = chessTable.GetValidMoves();
            if (!validMoves.Any())
            {
                return new MoveDecisionHelper(validMoves, new List<MoveWithGainInfo>());
            }

            var movesToConsider = movePreFilterPredicate == null ? validMoves : validMoves.Where(movePreFilterPredicate);

            var goodMovesWithGainInfo = ArtificalIntelligence.GetGoodMoves(chessTable, figureValueCalculator, movesToConsider, enemyMoveProvider, breakOnCheckMate);
            return new MoveDecisionHelper(validMoves, goodMovesWithGainInfo);
        }

        private static IList<MoveWithGainInfo> GetGoodMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, IEnumerable<Move> movesToConsider, Func<ChessTable, Move> enemyMoveProvider, bool breakOnCheckMate)
        {
            Contract.Requires(chessTable != null && enemyMoveProvider != null);

            IEnumerable<MoveWithDestinationSquareInfo> moves = movesToConsider
                .Select(validMove => new MoveWithDestinationSquareInfo { ValidMove = validMove, To = chessTable.Squares[validMove.To] });

            var goodMovesWithGainInfo = new List<MoveWithGainInfo>();
            foreach (var move in moves)
            { 
                move.ValidMove.Execute(chessTable);
                chessTable.TurnControl.ChangeTurn(false);

                var enemyMove = enemyMoveProvider(chessTable);
                if (enemyMove == null)
                {
                    if (CheckWhenEnemyHasNoMove(chessTable, figureValueCalculator, move, goodMovesWithGainInfo))
                    {
                        if (breakOnCheckMate)
                        {
                            break;
                        }
                    }
                }
                else
                {
                    AddGoodMove(chessTable, figureValueCalculator, goodMovesWithGainInfo, move, enemyMove);
                }

                move.ValidMove.Rollback(chessTable);
                chessTable.TurnControl.ChangeTurn(false);
            }

            return goodMovesWithGainInfo;
        }
    }
}