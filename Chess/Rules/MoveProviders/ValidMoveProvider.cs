using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.MoveProviders;

public class ValidMoveProvider
{
    private static readonly BishopMoveProvider bishopMoveProvider = new();
    private static readonly KingMoveProvider kingMoveProvider = new();
    private static readonly KnightMoveProvider knightMoveProvider = new();
    private static readonly PawnMoveProvider pawnMoveProvider = new();
    private static readonly QueenMoveProvider queenMoveProvider = new();
    private static readonly RookMoveProvider rookMoveProvider = new();

    private readonly Dictionary<SquareState, FigureMoveProvider> validators = new()
    {
        { SquareState.BlackPawn, pawnMoveProvider },
        { SquareState.BlackBishop, bishopMoveProvider },
        { SquareState.BlackKing, kingMoveProvider },
        { SquareState.BlackKingCanCastle, kingMoveProvider },
        { SquareState.BlackKingMyTurn, kingMoveProvider },
        { SquareState.BlackKingCanCastleMyTurn, kingMoveProvider },
        { SquareState.BlackKnight, knightMoveProvider },
        { SquareState.BlackQueen, queenMoveProvider },
        { SquareState.BlackRook, rookMoveProvider },
        { SquareState.BlackRookCanCastle, rookMoveProvider },

        { SquareState.WhitePawn, pawnMoveProvider },
        { SquareState.WhiteBishop, bishopMoveProvider },
        { SquareState.WhiteKing, kingMoveProvider },
        { SquareState.WhiteKingCanCastle, kingMoveProvider },
        { SquareState.WhiteKingMyTurn, kingMoveProvider },
        { SquareState.WhiteKingCanCastleMyTurn, kingMoveProvider },
        { SquareState.WhiteKnight, knightMoveProvider },
        { SquareState.WhiteQueen, queenMoveProvider },
        { SquareState.WhiteRook, rookMoveProvider },
        { SquareState.WhiteRookCanCastle, rookMoveProvider }
    };

    public IList<Move> GetAllMoves(ChessTable chessTable, Square figureSquare)
    {
        Contract.Requires(chessTable != null && figureSquare != null);

        if (!validators.ContainsKey(figureSquare.State))
        {
            return new List<Move>();
        }
        var validator = validators[figureSquare.State];
        return validator.GetAllMoves(chessTable, figureSquare);
    }

    public IList<Move> GetValidMoves(ChessTable chessTable, Square figureSquare, bool setCheckProperties)
    {
        Contract.Requires(chessTable != null && figureSquare != null);

        if (!validators.ContainsKey(figureSquare.State))
        {
            return new List<Move>();
        }
        var validator = validators[figureSquare.State];
        return validator.GetValidMoves(chessTable, figureSquare, setCheckProperties);
    }

    public bool HasValidMove(ChessTable chessTable, Square figureSquare)
    {
        return GetValidMoves(chessTable, figureSquare, false).Any();
    }
}
