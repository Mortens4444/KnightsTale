using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public abstract class FigureMoveProvider
{
    public abstract PossibleMoves GetAllMoves(ChessTable chessTable, Square from);

    public ValidMoves GetValidMoves(ChessTable chessTable, Square from, bool setCheckProperties, bool stopSearchOnFirstValidMove)
    {
        var result = GetAllMoves(chessTable, from);
        return ValidMoves.GetValidMovesFromPossibleMoves(chessTable, from, result, setCheckProperties, stopSearchOnFirstValidMove);
    }

    protected static void AddMove(Square from, Square destination, IList<Move> result)
    {
        Contract.Requires(from != null && destination != null && result != null);
        if (from.State.CanMoveToSquare(destination))
        {
            result.Add(new Move(from, destination));
        }
    }
}
