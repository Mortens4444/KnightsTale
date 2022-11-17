using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public class RookMoveProvider : FigureMoveProvider
{
    public override PossibleMoves GetAllMoves(ChessTable chessTable, Square from)
    {
        Contract.Requires(chessTable != null && from != null);

        var result = new PossibleMoves();

        Square destination;
        int modifier = 1;
        Rank rank;
        do
        {
            rank = from.Rank - modifier;
            if (rank >= Rank._1)
            {
                destination = chessTable.Squares[from.Column, rank];
                AddMove(from, destination, result);
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
                AddMove(from, destination, result);
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
                AddMove(from, destination, result);
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
                AddMove(from, destination, result);
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
