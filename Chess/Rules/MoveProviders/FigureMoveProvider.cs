using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.MoveProviders;

public abstract class FigureMoveProvider
{
    public abstract IList<Move> GetAllMoves(ChessTable chessTable, Square from);

    public IList<Move> GetValidMoves(ChessTable chessTable, Square from, bool setCheckProperties)
    {
        var result = GetAllMoves(chessTable, from);
        RemoveInvalidMoves(chessTable, from, result, setCheckProperties);
        return result;
    }

    protected static void AddValidMove(Square from, Square destination, IList<Move> result)
    {
        Contract.Requires(from != null && destination != null && result != null);

        if (from.State.HasEnemyOnSquare(destination))
        {
            AddHitMove(from, destination, result);
        }
        else if (destination.State.IsEmpty())
        {
            result.Add(new Move(from, destination, MoveType.Relocation));
        }
    }

    protected static void AddHitMove(Square from, Square to, IList<Move> result)
    {
        Contract.Requires(from != null && to != null && result != null);
        var moveType = to.GetMoveType();
        result.Add(new Move(from, to, moveType));
    }

    public static void RemoveInvalidMoves(ChessTable chessTable, Square from, IList<Move> allMoves, bool setCheckProperties)
    {
        Contract.Requires(chessTable != null && from != null && allMoves != null);

        if (!allMoves.Any())
        {
            return;
        }

        var white = from.State.HasWhiteFigure();
        var enPassantSquare = chessTable.Squares.GetEnPassantEmptySquare();

        Square kingSquare;
        Square foeKingSquare;

        if (white)
        {
            kingSquare = chessTable.Squares.GetWhiteKingSquare();
            foeKingSquare = chessTable.Squares.GetBlackKingSquare();
        }
        else
        {
            kingSquare = chessTable.Squares.GetBlackKingSquare();
            foeKingSquare = chessTable.Squares.GetWhiteKingSquare();
        }
        var invalidMoves = new List<Move>();
        var kingMoves = kingSquare == allMoves[0].From;
        var movingFigure = allMoves[0].From;
        Move lastMove = null;

        foreach (var move in allMoves)
        {
            lastMove?.Rollback(chessTable, false, false);
            lastMove = null;

            if (move.MoveType == MoveType.Castle && chessTable.IsInCheck(kingSquare))
            {
                invalidMoves.Add(move);
            }
            else
            {
                lastMove = move;
                move.Execute(chessTable, false, false);

                if (kingMoves)
                {
                    kingSquare = move.To;
                }

                if (chessTable.IsInCheck(kingSquare) || OppositionTester.IsOpposition(kingSquare, foeKingSquare, move))
                {
                    invalidMoves.Add(move);
                }
                else
                {
                    if (move.MoveType == MoveType.CheckMate)
                    {
                        move.IsEnemyInCheckMate = true;
                    }
                    else
                    {
                        if (setCheckProperties && chessTable.IsInCheck(foeKingSquare))
                        {
                            if (chessTable.HasValidMove(foeKingSquare.State))
                            {
                                move.IsEnemyInCheck = true;
                            }
                            else
                            {
                                move.IsEnemyInCheckMate = true;
                            }
                        }
                    }
                }
            }
        }
        lastMove?.Rollback(chessTable, false, false);
        RestoreEnPassantEmptySquare(chessTable, enPassantSquare);
        allMoves.RemoveAll(move => invalidMoves.Contains(move));
    }

    private static void RestoreEnPassantEmptySquare(ChessTable chessTable, Square enPassantSquare)
    {
        if (enPassantSquare != null)
        {
            enPassantSquare.State = SquareState.EnPassantEmpty;
        }
    }
}
