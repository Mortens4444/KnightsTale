using Chess.AI;
using Chess.FigureValues;
using Chess.Table;
using Chess.Table.TableSquare;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.Moves;

public class Move : IEquatable<Move>
{
    const string A1 = "A1";
    const string D1 = "D1";
    const string F1 = "F1";
    const string H1 = "H1";
    const string A8 = "A8";
    const string D8 = "D8";
    const string F8 = "F8";
    const string H8 = "H8";

    public Square From { get; }

    public Square To { get; }

    public SquareState CapturedFigure { get; private set; }

    public bool NoMoreCastle { get; private set; }
    
    public bool IsEnemyInCheck { get; set; }

    public bool IsEnemyInCheckMate { get; set; }

    public MoveType MoveType { get; }

    public Move(string move, ChessTable chessTable)
    {
        if (chessTable == null)
        {
            throw new ArgumentNullException(nameof(chessTable));
        }

        if (move == null)
        {
            throw new ArgumentNullException(nameof(move));
        }

        if (move.Length != 4)
        {
            throw new ArgumentException("Move length should be 4 characters", nameof(move));
        }

        From = chessTable.Squares[move[..2]];
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

    public void Execute(ChessTable chessTable, bool changeTurn, bool sendTurnChangedEvent, bool hasPawnPromotionEvent = false)
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
                if (hasPawnPromotionEvent)
                {
                    return;
                }
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
                chessTable.Squares[D1].State = chessTable.Squares[A1].State;
                chessTable.Squares[A1].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares[F1].State = chessTable.Squares[H1].State;
                chessTable.Squares[H1].State = SquareState.Empty;
            }
        }
        else
        {
            // Black king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares[D8].State = chessTable.Squares[A8].State;
                chessTable.Squares[A8].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares[F8].State = chessTable.Squares[H8].State;
                chessTable.Squares[H8].State = SquareState.Empty;
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

        From.State = To.State;
        To.State = SquareState.Empty;
        if (NoMoreCastle)
        {
            From.State = From.State.SetCastle();
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
                From.State = To.Rank == Rank._8 ?
                    SquareState.WhitePawn : SquareState.BlackPawn;
                break;
            case MoveType.Hit:
            case MoveType.CheckMate:
                To.State = CapturedFigure;
                break;
            case MoveType.HitWithPromotion:
                From.State = To.Rank == Rank._8 ?
                    SquareState.WhitePawn : SquareState.BlackPawn;
                To.State = CapturedFigure;
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
                chessTable.Squares[A1].State = chessTable.Squares[D1].State;
                chessTable.Squares[D1].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares[H1].State = chessTable.Squares[F1].State;
                chessTable.Squares[F1].State = SquareState.Empty;
            }
        }
        else
        {
            // Black king castle
            if (To.Column == Column.C)
            {
                // Long castle
                chessTable.Squares[A8].State = chessTable.Squares[D8].State;
                chessTable.Squares[D8].State = SquareState.Empty;
            }
            else
            {
                // Short castle
                chessTable.Squares[H8].State = chessTable.Squares[F8].State;
                chessTable.Squares[F8].State = SquareState.Empty;
            }
        }
    }
    
    public MoveEvaluationResult EvaluateMove(ChessTable chessTable, Delegates.MoveDecisionHelperCallback moveDecisionHelperCallback, FigureValueCalculator figureValueCalculator)
    {
        if (chessTable == null)
        {
            throw new ArgumentNullException(nameof(chessTable));
        }

        if (moveDecisionHelperCallback == null)
        {
            throw new ArgumentNullException(nameof(moveDecisionHelperCallback));
        }

        if (figureValueCalculator == null)
        {
            throw new ArgumentNullException(nameof(figureValueCalculator));
        }

        var result = MoveEvaluationResult.Unknown;
        Execute(chessTable, true, false);

        var enemyKing = To.State.HasWhiteFigure() ? chessTable.Squares.GetBlackKingSquare() : chessTable.Squares.GetWhiteKingSquare();
        if (chessTable.HasValidMove(enemyKing.State))
        {
            if (enemyKing.IsInCheck(chessTable))
            {
                var enemyMoves = chessTable.GetValidMoves();
                if (enemyMoves.Count == 1)
                {
                    enemyMoves[0].Execute(chessTable, true, false);
                    var mdh = moveDecisionHelperCallback(chessTable);
                    if (mdh.GoodMovesWithGain.Any(g => g.Gain == Double.MaxValue))
                    {
                        result = MoveEvaluationResult.WinInTwoMoves;
                    }
                    enemyMoves[0].Rollback(chessTable, true, false);
                }
                else
                {
                    var mdh = moveDecisionHelperCallback(chessTable);
                    if (mdh.GoodMovesWithGain.Any(g => g.Move.To == To))
                    {
                        result = MoveEvaluationResult.Questionable;
                    }
                    else 
                    // Check is not always a good move!!!
                    result = MoveEvaluationResult.Good;
                }
            }
            else
            {
                var gain = figureValueCalculator.GetValue(CapturedFigure);

                var enemyMoveDecisionHelper = moveDecisionHelperCallback(chessTable);

                var goodMove = enemyMoveDecisionHelper.GoodMovesWithGain.Any(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Gain - gain < 0);
                if (goodMove)
                {
                    result = MoveEvaluationResult.Good;
                }

                var badMove = enemyMoveDecisionHelper.GoodMovesWithGain.Any(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Gain - gain > 0);
                if (badMove)
                {
                    result = MoveEvaluationResult.Bad;
                }
            }
        }
        else
        {
            // Not sure if this is a winner move, other figures still can move!!!
            if (enemyKing.IsInCheck(chessTable))
            {
                result = MoveEvaluationResult.Winner;
            }
        }

        Rollback(chessTable, true, false);

        return result;
    }

    public Move Clone(ChessTable chessTable)
    {
        if (chessTable == null)
        {
            throw new ArgumentNullException(nameof(chessTable));
        }

        return new Move(chessTable.Squares[From.Name], chessTable.Squares[To.Name], MoveType)
        {
            CapturedFigure = CapturedFigure,
            NoMoreCastle = NoMoreCastle,
            IsEnemyInCheck = IsEnemyInCheck,
            IsEnemyInCheckMate = IsEnemyInCheckMate
        };
    }
}
