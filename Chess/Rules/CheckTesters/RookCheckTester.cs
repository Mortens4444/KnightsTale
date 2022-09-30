using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.CheckTesters
{
    public class RookCheckTester : ICheckTester
    {
        public bool IsCheck(ChessTable chessTable, Square kingSquare, IList<Move> invalidMoves, Move move)
        {
            Contract.Requires(chessTable != null && kingSquare != null && invalidMoves != null);

            Square destination = null;
            int modifier = 1;
            Rank rank;
            Column column;

            do
            {
                rank = kingSquare.Rank - modifier;
                if (rank >= Rank._1)
                {
                    destination = chessTable.Squares[kingSquare.Column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsRook())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            destination = null;
            modifier = 1;
            do
            {
                rank = kingSquare.Rank + modifier;
                if (rank <= Rank._8)
                {
                    destination = chessTable.Squares[kingSquare.Column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsRook())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            modifier = 1;
            destination = null;
            do
            {
                column = kingSquare.Column - modifier;
                if (column >= Column.A)
                {
                    destination = chessTable.Squares[column, kingSquare.Rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsRook())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            modifier = 1;
            destination = null;
            do
            {
                column = kingSquare.Column + modifier;
                if (column <= Column.H)
                {
                    destination = chessTable.Squares[column, kingSquare.Rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsRook())
                    {
                        invalidMoves.Add(move);
                        return true;
                    }
                }
                else
                {
                    break;
                }
                modifier++;
            } while (!destination?.State.HasFigure() ?? false);

            return false;
        }
    }
}
