using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public class RookMoveProvider : FigureMoveProvider
{
    public override IList<Move> GetAllMoves(ChessTable chessTable, Square from)
    {
        Contract.Requires(chessTable != null && from != null);

        var result = new List<Move>();

        Square destination;
        int modifier = 1;
        Rank rank;
        do
        {
            rank = from.Rank - modifier;
            if (rank >= Rank._1)
            {
                destination = chessTable.Squares[from.Column, rank];
                AddValidMove(from, destination, result);
                modifier++;
            }
            else
            {
                break;
            }
        } while (!destination?.State.HasFigure() ?? false);

        modifier = 1;
        do
        {
            rank = from.Rank + modifier;
            if (rank <= Rank._8)
            {
                destination = chessTable.Squares[from.Column, rank];
                AddValidMove(from, destination, result);
                modifier++;
            }
            else
            {
                break;
            }
        } while (!destination?.State.HasFigure() ?? false);

        modifier = 1;
        Column column;
        do
        {
            column = from.Column - modifier;
            if (column >= Column.A)
            {
                destination = chessTable.Squares[column, from.Rank];
                AddValidMove(from, destination, result);
                modifier++;
            }
            else
            {
                break;
            }
        } while (!destination?.State.HasFigure() ?? false);

        modifier = 1;
        do
        {
            column = from.Column + modifier;
            if (column <= Column.H)
            {
                destination = chessTable.Squares[column, from.Rank];
                AddValidMove(from, destination, result);
                modifier++;
            }
            else
            {
                break;
            }
        } while (!destination?.State.HasFigure() ?? false);

        return result;
    }
}
