using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public class KnightMoveProvider : FigureMoveProvider
{
    public override PossibleMoves GetAllMoves(ChessTable chessTable, Square from)
    {
        Contract.Requires(chessTable != null && from != null);

        var result = new PossibleMoves();

        Square destination;

        if (from.Column > Column.A)
        {
            if (from.Rank > Rank._2)
            {
                destination = chessTable.Squares[from.Column - 1, from.Rank - 2];
                AddMove(from, destination, result);
            }

            if (from.Rank < Rank._7)
            {
                destination = chessTable.Squares[from.Column - 1, from.Rank + 2];
                AddMove(from, destination, result);
            }
        }

        if (from.Column > Column.B)
        {
            if (from.Rank > Rank._1)
            {
                destination = chessTable.Squares[from.Column - 2, from.Rank - 1];
                AddMove(from, destination, result);
            }

            if (from.Rank < Rank._8)
            {
                destination = chessTable.Squares[from.Column - 2, from.Rank + 1];
                AddMove(from, destination, result);
            }
        }

        if (from.Column < Column.G)
        {
            if (from.Rank > Rank._1)
            {
                destination = chessTable.Squares[from.Column + 2, from.Rank - 1];
                AddMove(from, destination, result);
            }

            if (from.Rank < Rank._8)
            {
                destination = chessTable.Squares[from.Column + 2, from.Rank + 1];
                AddMove(from, destination, result);
            }
        }

        if (from.Column < Column.H)
        {
            if (from.Rank > Rank._2)
            {
                destination = chessTable.Squares[from.Column + 1, from.Rank - 2];
                AddMove(from, destination, result);
            }

            if (from.Rank < Rank._7)
            {
                destination = chessTable.Squares[from.Column + 1, from.Rank + 2];
                AddMove(from, destination, result);
            }
        }

        return result;
    }
}
