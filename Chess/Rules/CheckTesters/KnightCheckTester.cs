using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.CheckTesters
{
    public class KnightCheckTester : ICheckTester
    {
        public bool IsCheck(ChessTable chessTable, Square kingSquare, IList<Move> invalidMoves, Move move)
        {
            Contract.Requires(chessTable != null && kingSquare != null && invalidMoves != null);

            if (kingSquare.Column > Column.A)
            {
                if (kingSquare.Rank > Rank._2)
                {
                    var square = chessTable.Squares[kingSquare.Column - 1, kingSquare.Rank - 2];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }

                if (kingSquare.Rank < Rank._7)
                {
                    var square = chessTable.Squares[kingSquare.Column - 1, kingSquare.Rank + 2];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }

            if (kingSquare.Column > Column.B)
            {
                if (kingSquare.Rank > Rank._1)
                {
                    var square = chessTable.Squares[kingSquare.Column - 2, kingSquare.Rank - 1];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }

                if (kingSquare.Rank < Rank._8)
                {
                    var square = chessTable.Squares[kingSquare.Column - 2, kingSquare.Rank + 1];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }

            if (kingSquare.Column < Column.G)
            {
                if (kingSquare.Rank > Rank._1)
                {
                    var square = chessTable.Squares[kingSquare.Column + 2, kingSquare.Rank - 1];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }

                if (kingSquare.Rank < Rank._8)
                {
                    var square = chessTable.Squares[kingSquare.Column + 2, kingSquare.Rank + 1];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }

            if (kingSquare.Column < Column.H)
            {
                if (kingSquare.Rank > Rank._2)
                {
                    var square = chessTable.Squares[kingSquare.Column + 1, kingSquare.Rank - 2];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }

                if (kingSquare.Rank < Rank._7)
                {
                    var square = chessTable.Squares[kingSquare.Column + 1, kingSquare.Rank + 2];
                    if (square.State.HasEnemyOnSquare(kingSquare) && square.State.HasKnight())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
