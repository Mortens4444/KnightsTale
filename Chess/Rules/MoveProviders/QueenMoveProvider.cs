using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;

namespace Chess.Rules.MoveProviders;

public class QueenMoveProvider : FigureMoveProvider
{
    private readonly BishopMoveProvider bishopMoveProvider = new();
    private readonly RookMoveProvider rookMoveProvider = new();

    public override PossibleMoves GetAllMoves(ChessTable chessTable, Square from)
    {
        var result = new PossibleMoves();
        var result1 = bishopMoveProvider.GetAllMoves(chessTable, from);
        var result2 = rookMoveProvider.GetAllMoves(chessTable, from);
        result.AddRange(result1);
        result.AddRange(result2);
        return result;
    }
}
