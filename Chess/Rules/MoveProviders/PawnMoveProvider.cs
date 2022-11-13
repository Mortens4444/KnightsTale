using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders;

public class PawnMoveProvider : FigureMoveProvider
{
    public override IList<Move> GetAllMoves(ChessTable chessTable, Square from)
    {
        Contract.Requires(chessTable != null && from != null);

        var result = new List<Move>();
        Square to;

        if (from.State == SquareState.WhitePawn ||
            from.State == SquareState.WhitePawnCanHitWithEnPassant)
        {
            if (from.Rank != Rank._8)
            {
                to = chessTable.Squares[from.Column, from.Rank + 1];
                if (!to.State.HasFigure())
                {
                    result.Add(new Move(from, to, to.Rank == Rank._8 ? MoveType.Promotion : MoveType.Relocation));
                    AddInitialMove(chessTable, from, result, Rank._2, Rank._4);
                }
            }
            if (from.Column != Column.A)
            {
                AddEnPassantMove(chessTable, from, result, Rank._5, Rank._6, -1);

                if (from.Rank != Rank._8)
                {
                    to = chessTable.Squares[from.Column - 1, from.Rank + 1];
                    if (to.State.HasBlackFigure())
                    {
                        AddHitMove(from, to, result);
                    }
                }
            }
            if (from.Column != Column.H)
            {
                AddEnPassantMove(chessTable, from, result, Rank._5, Rank._6, 1);

                if (from.Rank != Rank._8)
                {
                    to = chessTable.Squares[from.Column + 1, from.Rank + 1];
                    if (to.State.HasBlackFigure())
                    {
                        AddHitMove(from, to, result);
                    }
                }
            }
        }
        else if (from.State == SquareState.BlackPawn ||
            from.State == SquareState.BlackPawnCanHitWithEnPassant)
        {
            if (from.Rank != Rank._1)
            {
                to = chessTable.Squares[from.Column, from.Rank - 1];
                if (!to.State.HasFigure())
                {
                    result.Add(new Move(from, to, to.Rank == Rank._1 ? MoveType.Promotion : MoveType.Relocation));
                    AddInitialMove(chessTable, from, result, Rank._7, Rank._5);
                }
            }

            if (from.Column != Column.A)
            {
                AddEnPassantMove(chessTable, from, result, Rank._4, Rank._3, -1);

                if (from.Rank != Rank._1)
                {
                    to = chessTable.Squares[from.Column - 1, from.Rank - 1];
                    if (to.State.HasWhiteFigure())
                    {
                        AddHitMove(from, to, result);
                    }
                }
            }

            if (from.Column != Column.H)
            {
                AddEnPassantMove(chessTable, from, result, Rank._4, Rank._3, 1);

                if (from.Rank != Rank._1)
                {
                    to = chessTable.Squares[from.Column + 1, from.Rank - 1];
                    if (to.State.HasWhiteFigure())
                    {
                        AddHitMove(from, to, result);
                    }
                }
            }
        }

        return result;
    }

    private static void AddEnPassantMove(ChessTable chessTable, Square from, List<Move> result, Rank fromRank, Rank toRank, int columnDelta)
    {
        var enPassantSquare = chessTable.Squares[from.Column + columnDelta, toRank];
        if (from.Rank == fromRank && enPassantSquare.State == SquareState.EnPassantEmpty)
        {
            result.Add(new Move(from, enPassantSquare, MoveType.EnPassant));
        }
    }

    private static void AddInitialMove(ChessTable chessTable, Square from, List<Move> result, Rank fromRank, Rank toRank)
    {
        var to = chessTable.Squares[from.Column, toRank];
        if (from.Rank == fromRank && !to.State.HasFigure())
        {
            result.Add(new Move(from, to, MoveType.Relocation));
        }
    }
}
