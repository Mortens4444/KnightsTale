using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public class KingMoveProvider : FigureMoveProvider
{
    public override IList<Move> GetAllMoves(ChessTable chessTable, SquareBase from)
    {
        Contract.Requires(chessTable != null && from != null);

        var result = new List<Move>();

        Column column = from.Column - 1;
        Rank rank;

        var kingSquare = chessTable.Squares[from];
        if (column >= Column.A)
        {
            AddValidMove(kingSquare, chessTable.Squares[column, from.Rank], result);

            rank = from.Rank - 1;
            if (rank >= Rank._1)
            {
                AddValidMove(kingSquare, chessTable.Squares[column, rank], result);
            }
        }

        rank = from.Rank - 1;
        if (rank >= Rank._1)
        {
            AddValidMove(kingSquare, chessTable.Squares[from.Column, rank], result);

            column = from.Column + 1;
            if (column <= Column.H)
            {
                AddValidMove(kingSquare, chessTable.Squares[column, rank], result);
            }
        }

        column = from.Column + 1;
        if (column <= Column.H)
        {
            AddValidMove(kingSquare, chessTable.Squares[column, from.Rank], result);

            rank = from.Rank + 1;
            if (rank <= Rank._8)
            {
                AddValidMove(kingSquare, chessTable.Squares[column, rank], result);
            }
        }

        rank = from.Rank + 1;
        if (rank <= Rank._8)
        {
            AddValidMove(kingSquare, chessTable.Squares[from.Column, rank], result);

            column = from.Column - 1;
            if (column >= Column.A)
            {
                AddValidMove(kingSquare, chessTable.Squares[column, rank], result);
            }
        }

        if (kingSquare.State.CanCastle())
        {
            var kingDestination = chessTable.Squares[from.Column - 2, from.Rank];
            if (kingDestination.State.IsEmpty() &&
                chessTable.Squares[Column.D, from.Rank].State.IsEmpty() &&
                chessTable.Squares[Column.B, from.Rank].State.IsEmpty() &&
                chessTable.Squares[Column.A, from.Rank].State.CanCastle())
            {
                result.Add(new Move(kingSquare, kingDestination, MoveType.Castle));
            }

            kingDestination = chessTable.Squares[from.Column + 2, from.Rank];
            if (kingDestination.State.IsEmpty() &&
                chessTable.Squares[Column.F, from.Rank].State.IsEmpty() &&
                chessTable.Squares[Column.H, from.Rank].State.CanCastle())
            {
                result.Add(new Move(kingSquare, kingDestination, MoveType.Castle));
            }
        }

        return result;
    }
}
