using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.CheckTesters
{
    public class BishopCheckTester : ICheckTester
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
                column = kingSquare.Column - modifier;
                rank = kingSquare.Rank - modifier;
                if (rank >= Rank._1 && column >= Column.A)
                {
                    destination = chessTable.Squares[column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsBishop())
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
                column = kingSquare.Column + modifier;
                rank = kingSquare.Rank + modifier;
                if (rank <= Rank._8 && column <= Column.H)
                {
                    destination = chessTable.Squares[column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsBishop())
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
                rank = kingSquare.Rank + modifier;
                if (column >= Column.A && rank <= Rank._8)
                {
                    destination = chessTable.Squares[column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsBishop())
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
                rank = kingSquare.Rank - modifier;
                if (column <= Column.H && rank >= Rank._1)
                {
                    destination = chessTable.Squares[column, rank];
                    if (destination.State.HasEnemyOnSquare(kingSquare) && destination.State.CanMoveAsBishop())
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
