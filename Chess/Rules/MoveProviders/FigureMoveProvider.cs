using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.MoveProviders;

public abstract class FigureMoveProvider
{
    private static uint removeCheckMovesHitCount = 0;

    public abstract IList<Move> GetAllMoves(ChessTable chessTable, SquareBase from);

    public IList<Move> GetValidMoves(ChessTable chessTable, SquareBase from, bool setCheckProperties)
    {
        var result = GetAllMoves(chessTable, from);
        RemoveCheckMoves(chessTable, from, result, setCheckProperties);
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

    protected static void AddHitMove(SquareBase from, Square to, IList<Move> result)
    {
        Contract.Requires(from != null && to != null && result != null);
        var moveType = to.GetMoveType();
        result.Add(new Move(from, to, moveType));
    }

    public static void RemoveCheckMoves(ChessTable chessTable, SquareBase from, IList<Move> allMoves, bool setCheckProperties)
    {
        Contract.Requires(chessTable != null && from != null && allMoves != null);

        if (!allMoves.Any())
        {
            return;
        }

        chessTable.DebugWriter($"RemoveCheckMoves hit count: {++removeCheckMovesHitCount}");

        var white = chessTable.Squares[from].State.HasWhiteFigure();
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

        chessTable.DebugWriter($"{movingFigure} has {allMoves.Count} moves:{Environment.NewLine}{chessTable.DebuggerDisplay}{Environment.NewLine}{String.Join(", ", allMoves)}");

        foreach (var move in allMoves)
        {
            lastMove?.Rollback(chessTable);
            lastMove = move;
            move.Execute(chessTable);

            chessTable.DebugWriter($"Testing move: {move}...");

            if (kingMoves)
            {
                kingSquare = chessTable.Squares[move.To];
            }

            if (chessTable.IsInCheck(kingSquare) || OppositionTester.IsOpposition(kingSquare, foeKingSquare, move))
            {
                invalidMoves.Add(move);

                chessTable.DebugWriter("Invalid.");
            }
            else
            {
                if (setCheckProperties && chessTable.IsInCheck(foeKingSquare))
                {
                    if (chessTable.HasValidMove(foeKingSquare.State))
                    {
                        move.IsEnemyInCheck = true;
                        chessTable.DebugWriter($"Check for {foeKingSquare} when {chessTable.Squares[move.To].State} moves {move}.");
                    }
                    else
                    {
                        move.IsEnemyInCheckMate = true;
                        chessTable.DebugWriter($"Checkmate for {foeKingSquare} when {chessTable.Squares[move.To].State} moves {move}.");
                    }
                }

                chessTable.DebugWriter("Valid.");
            }
        }
        lastMove?.Rollback(chessTable);
        RestoreEnPassantEmptySquare(chessTable, enPassantSquare);
        allMoves.RemoveAll(move => invalidMoves.Contains(move));

        chessTable.DebugWriter(allMoves.Any() ?
            $"The valid moves are:{Environment.NewLine}{String.Join(", ", allMoves)}{Environment.NewLine}--------------------------------------------" :
            $"There are no valid moves for {movingFigure}{Environment.NewLine}--------------------------------------------");
    }

    private static void RestoreEnPassantEmptySquare(ChessTable chessTable, Square enPassantSquare)
    {
        if (enPassantSquare != null)
        {
            chessTable.Squares[enPassantSquare].State = SquareState.EnPassantEmpty;
        }
    }
}
