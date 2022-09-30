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
            if (chessTable.Squares[myMove.ValidMove.To].State.HasWhiteFigure())
            {
                var diff = whiteFiguresValue - blackFiguresValue;
                if (diff < 0)
                {
                    goodMoves.Add(new MoveWithGainInfo(myMove.ValidMove, Math.Abs(diff))); // Tie (white losing)
                }
            }
            else
            {
                var diff = blackFiguresValue - whiteFiguresValue;
                if (diff < 0)
                {
                    goodMoves.Add(new MoveWithGainInfo(myMove.ValidMove, Math.Abs(diff))); // Tie (black losing)
                }
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

        public static void CheckMoves(ChessTable chessTable, FigureValueCalculator figureValueCalculator, IList<MoveWithGainInfo> goodMoves, IEnumerable<MoveWithDestinationSquareInfo> moves, Func<ChessTable, Move> moveProvider, bool breakOnCheckMate)
        {
            Contract.Requires(chessTable != null && moveProvider != null && goodMoves != null);

            if (moves != null && moves.Any())
            {
                foreach (var move in moves)
                {
                    move.ValidMove.Execute(chessTable);
                    chessTable.TurnControl.ChangeTurn(false);

                    var enemyMove = moveProvider(chessTable);
                    if (enemyMove == null)
                    {
                        if (CheckWhenEnemyHasNoMove(chessTable, figureValueCalculator, move, goodMoves))
                        {
                            if (breakOnCheckMate)
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        AddGoodMove(chessTable, figureValueCalculator, goodMoves, move, enemyMove);
                    }

                    move.ValidMove.Rollback(chessTable);
                    chessTable.TurnControl.ChangeTurn(false);
                }
            }
        }
    }
}