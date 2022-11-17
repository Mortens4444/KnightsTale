﻿using Chess.AI;
using Chess.FigureValues;
using Chess.Table;
using Chess.Table.TableSquare;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.Moves;

public class Move : IEquatable<Move>
{
    public Square From { get; }

    public Square To { get; }

    public SquareState CapturedFigure { get; private set; }

    public bool NoMoreCastle { get; private set; }
    
    public bool IsEnemyInCheck { get; set; }

    public bool IsEnemyInCheckMate { get; set; }

    public MoveType MoveType { get; }

    public Move(string move, ChessTable chessTable)
    {
        if (move == null)
        {
            throw new ArgumentNullException(nameof(move));
        }
        if (move.Length != 4)
        {
            throw new ArgumentException("Move length should be 4 characters", nameof(move));
        }

        From = chessTable.Squares[move.Substring(0, 2)];
        To = chessTable.Squares[move.Substring(2, 2)];

        MoveType = SetMoveType(GetMoveType());
    }

    public Move(Square from, Square to, MoveType moveType = MoveType.Unknown)
    {
        From = from;
        To = to;
        MoveType = SetMoveType(moveType);
    }

    private MoveType GetMoveType()
    {
        if (From.State.HasPawn())
        {
            if (Math.Abs(From.Column - To.Column) == 1 && To.State.IsEmpty())
            {
                return MoveType.EnPassant;
            }
            if (To.Rank == Rank._1 || To.Rank == Rank._8)
            {
                return MoveType.Promotion;
            }
        }
        else if (From.State.HasKing() && Math.Abs(From.Column - To.Column) == 2)
        {
            return MoveType.Castle;
        }
        return MoveType.Unknown;
    }

    private MoveType SetMoveType(MoveType moveType)
    {
        if (moveType != MoveType.Unknown)
        {
            return moveType;
        }

        if (To.State.IsEmpty())
        {
            return MoveType.Relocation;
        }
        else
        {
            if (To.State.HasKing())
            {
                IsEnemyInCheck = true;
                IsEnemyInCheckMate = true;
                return MoveType.CheckMate;
            }
            else
            {
                if (From.State.HasPawn() && (To.Rank == Rank._1 || To.Rank == Rank._8))
                {
                    return MoveType.HitWithPromotion;
                }
                return MoveType.Hit;
            }
        }
    }

    public override string ToString()
    {
        return $"{From.Name} - {To.Name}";
    }

    public bool Equals(Move other)
    {
        if (other == null)
        {
            return false;
        }

        return From.Equals(other.From) && To.Equals(other.To);
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as Move);
    }

    public override int GetHashCode()
    {
        return (byte)From.Column;
    }

    public static Move FromString(string value, ChessTable chessTable)
    {
        return new Move(value, chessTable);
    }

    public void Execute(ChessTable chessTable, bool changeTurn, bool sendTurnChangedEvent)
    {
        Contract.Requires(chessTable != null);

        if (From.State.CanCastle())
        {
            From.State = From.State.ClearCastlingFlag();
            NoMoreCastle = true;
        }
        if (MoveType == MoveType.Hit || MoveType == MoveType.HitWithPromotion || MoveType == MoveType.CheckMate || IsEnemyInCheck || IsEnemyInCheckMate)
        {
            Hit();
        }
        To.State = From.State;
        From.State = SquareState.Empty;

        chessTable.ClearEnPassantSquare();
        switch (MoveType)
        {
            case MoveType.Relocation:
                SetEnPassantSquare(chessTable);
                break;
            case MoveType.EnPassant:
                EnPassant(chessTable);
                break;
            case MoveType.Castle:
                Castle(chessTable);
                break;
            case MoveType.HitWithPromotion:
            case MoveType.Promotion:
                Promotion();
                break;
            case MoveType.Hit:
            case MoveType.CheckMate:
                break;
            default:
                throw new NotImplementedException();
        }
        if (changeTurn)
        {
            chessTable.TurnControl.ChangeTurn(this, sendTurnChangedEvent);
        }
    }

    private void Promotion()
    {
        To.State = To.Rank == Rank._8 ? SquareState.WhiteQueen : SquareState.BlackQueen;
    }

    private void EnPassant(ChessTable chessTable)
    {
        var hitSquare = chessTable.Squares[To.Column, From.Rank];
        CapturedFigure = hitSquare.State;
        hitSquare.State = SquareState.Empty;
    }

    private void Castle(ChessTable chessTable)
    {
        if (From.Rank == Rank._1)
        {
            // White king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares["D1"].State = chessTable.Squares["A1"].State;
                chessTable.Squares["A1"].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares["F1"].State = chessTable.Squares["H1"].State;
                chessTable.Squares["H1"].State = SquareState.Empty;
            }
        }
        else
        {
            // Black king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares["D8"].State = chessTable.Squares["A8"].State;
                chessTable.Squares["A8"].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares["F8"].State = chessTable.Squares["H8"].State;
                chessTable.Squares["H8"].State = SquareState.Empty;
            }
        }
    }

    private void Hit()
    {
        CapturedFigure = To.State;
    }

    private void SetEnPassantSquare(ChessTable chessTable)
    {
        var movedRanks = To.Rank - From.Rank;
        if (To.State.HasPawn() && Math.Abs(movedRanks) == 2)
        {
            chessTable.Squares[From.Column, From.Rank + movedRanks / 2].State = SquareState.EnPassantEmpty;
        }
    }

    private void ClearEnPassantSquare(ChessTable chessTable)
    {
        var movedRanks = To.Rank - From.Rank;
        if (From.State.HasPawn() && Math.Abs(movedRanks) == 2)
        {
            chessTable.Squares[From.Column, From.Rank + movedRanks / 2].State = SquareState.Empty;
        }
    }

    public void Rollback(ChessTable chessTable, bool changeTurn, bool sendTurnChangedEvent)
    {
        Contract.Requires(chessTable != null);

        var fromSquare = chessTable.Squares[From];
        var toSquare = chessTable.Squares[To];

        fromSquare.State = toSquare.State;
        toSquare.State = SquareState.Empty;
        if (NoMoreCastle)
        {
            fromSquare.State = fromSquare.State.SetCastle();
            NoMoreCastle = false;
        }

        switch (MoveType)
        {
            case MoveType.Relocation:
                ClearEnPassantSquare(chessTable);
                break;
            case MoveType.EnPassant:
                chessTable.Squares[To.Column, From.Rank].State = CapturedFigure;
                break;
            case MoveType.Castle:
                CastleRollback(chessTable);
                break;
            case MoveType.Promotion:
                fromSquare.State = To.Rank == Rank._8 ?
                    SquareState.WhitePawn : SquareState.BlackPawn;
                break;
            case MoveType.Hit:
            case MoveType.CheckMate:
                toSquare.State = CapturedFigure;
                break;
            case MoveType.HitWithPromotion:
                fromSquare.State = To.Rank == Rank._8 ?
                    SquareState.WhitePawn : SquareState.BlackPawn;
                toSquare.State = CapturedFigure;
                break;
            default:
                throw new NotImplementedException();
        }
        if (changeTurn)
        {
            chessTable.TurnControl.ChangeTurn(this, sendTurnChangedEvent);
        }
    }

    private void CastleRollback(ChessTable chessTable)
    {
        if (From.Rank == Rank._1)
        {
            // White king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares["A1"].State = chessTable.Squares["D1"].State;
                chessTable.Squares["D1"].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares["H1"].State = chessTable.Squares["F1"].State;
                chessTable.Squares["F1"].State = SquareState.Empty;
            }
        }
        else
        {
            // Black king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares["A8"].State = chessTable.Squares["D8"].State;
                chessTable.Squares["D8"].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares["H8"].State = chessTable.Squares["F8"].State;
                chessTable.Squares["F8"].State = SquareState.Empty;
            }
        }
    }

    public bool IsBadMove(ChessTable chessTable, Delegates.MoveDecisionHelperCallback moveDecisionHelperCallback, FigureValueCalculator figureValueCalculator)
    {
        Execute(chessTable, true, false);
        var gain = figureValueCalculator.GetValue(CapturedFigure);

        var enemyMoveDecisionHelper = moveDecisionHelperCallback(chessTable);
        var result = enemyMoveDecisionHelper.GoodMovesWithGain.Any(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Gain - gain > 0);

        Rollback(chessTable, true, false);

        return result;
    }
}
