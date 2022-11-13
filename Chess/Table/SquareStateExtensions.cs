using Chess.Table.TableSquare;
using System;
using System.Diagnostics.Contracts;

namespace Chess.Table;

public static class SquareStateExtensions
{
    public static bool IsEmpty(this SquareState squareState)
    {
        return squareState == SquareState.Empty || squareState == SquareState.EnPassantEmpty;
    }

    public static bool HasFigure(this SquareState squareState)
    {
        return !IsEmpty(squareState);
    }

    public static bool HasWhiteFigure(this SquareState squareState)
    {
        return squareState >= SquareState.WhitePawn && squareState <= SquareState.WhiteKingCanCastleMyTurn;
    }

    public static bool HasBlackFigure(this SquareState squareState)
    {
        return squareState.HasFlag((SquareState)0x80);
    }

    public static bool IsMyTurn(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhitePawn) && squareState.HasKing();
    }

    public static SquareState SetTurn(this SquareState squareState, bool myTurn)
    {
        if (myTurn)
        {
            return squareState |= SquareState.WhitePawn;
        }

        return squareState &= (SquareState)0xFE;
    }

    public static bool HasEnemyOnSquare(this SquareState squareState, Square destination)
    {
        Contract.Requires(destination != null);

        return squareState.HasWhiteFigure() && destination.State.HasBlackFigure() ||
            squareState.HasBlackFigure() && destination.State.HasWhiteFigure();
    }

    public static bool HasPawn(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhitePawn) && !squareState.HasKing();
    }

    public static bool HasKnight(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhiteKnight);
    }

    public static bool HasBishop(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhiteBishop) && !squareState.HasFlag(SquareState.WhiteRook);
    }

    public static bool CanMoveAsBishop(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhiteBishop);
    }

    public static bool HasRook(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhiteRook) && !squareState.HasFlag(SquareState.WhiteBishop);
    }

    public static bool CanMoveAsRook(this SquareState squareState)
    {
        return squareState.HasFlag(SquareState.WhiteRook);
    }

    public static bool CanCastle(this SquareState squareState)
    {
        return squareState.HasFlag((SquareState)0x40);
    }

    public static SquareState ClearCastlingFlag(this SquareState squareState)
    {
        return squareState & ~(SquareState)0x40;
    }

    public static SquareState SetCastle(this SquareState squareState)
    {
        return squareState | (SquareState)0x40;
    }

    public static bool HasQueen(this SquareState squareState)
    {
        return CanMoveAsBishop(squareState) && CanMoveAsRook(squareState);
    }

    public static bool HasKing(this SquareState squareState)
    {
        return squareState.HasFlag((SquareState)0x10);
    }

    public static SquareInfoAttribute GetSquareInfo(this SquareState squareState)
    {
        var type = squareState.GetType();
        var memberInfo = type.GetMember(Enum.GetName(type, squareState));
        var attributes = memberInfo[0].GetCustomAttributes(typeof(SquareInfoAttribute), false);
        return (SquareInfoAttribute)attributes[0];
    }

    public static string ToString(this SquareState squareState, SquareInfoMode squareInfoMode)
    {
        var squareInfo = squareState.GetSquareInfo();
        return squareInfoMode switch
        {
            SquareInfoMode.Display => squareInfo.DisplayChar.ToString(),
            SquareInfoMode.Notation => squareInfo.NotationChar.ToString(),
            SquareInfoMode.Store => squareInfo.StoreChar.ToString(),
            _ => squareState.ToString(),
        };
        ;
    }
}
