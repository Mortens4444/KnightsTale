using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.CheckTesters
{
    public class PawnCheckTester : ICheckTester
    {
        public bool IsCheck(ChessTable chessTable, Square kingSquare, IList<Move> invalidMoves, Move move)
        {
            Contract.Requires(chessTable != null && kingSquare != null && invalidMoves != null);

            var white = kingSquare.State.HasWhiteFigure();
            int direction = white ? 1 : -1;
            if (white)
            {
                if (kingSquare.Rank < Rank._7)
                {
                    if (HasCheckFromPawn(chessTable, kingSquare, direction))
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }
            else
            {
                if (kingSquare.Rank > Rank._2)
                {
                    if (HasCheckFromPawn(chessTable, kingSquare, direction))
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }
            return false;
        }

        private static bool HasCheckFromPawn(ChessTable chessTable, Square kingSquare, int direction)
        {
            if (kingSquare.Column > Column.A)
            {
                var square = chessTable.Squares[kingSquare.Column - 1, kingSquare.Rank + direction];
                if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasPawn())
                {
                    return true;
                }
            }

            if (kingSquare.Column < Column.H)
            {
                var square = chessTable.Squares[kingSquare.Column + 1, kingSquare.Rank + direction];
                if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasPawn())
                {
                    return true;
                }
            }

            return false;
        }
    }
}
