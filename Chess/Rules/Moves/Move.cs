using Chess.Table;
using Chess.Table.TableSquare;
using System;
using System.Diagnostics.Contracts;

namespace Chess.Rules.Moves
{
    public class Move : IEquatable<Move>
    {
        public SquareBase From { get; private set; }

        public SquareBase To { get; private set; }

        public SquareState CapturedFigure { get; private set; }

        public bool NoMoreCastle { get; private set; }
        
        public bool IsEnemyInCheck { get; set; }

        public bool IsEnemyInCheckMate { get; set; }

        public MoveType MoveType { get; private set; }

        public Move(string move)
        {
            if (move == null)
            {
                throw new ArgumentNullException(nameof(move));
            }
            if (move.Length != 4)
            {
                throw new ArgumentException("Move length should be 4 characters", nameof(move));
            }

            From = move.Substring(0, 2);
            To = move.Substring(2, 2);
            MoveType = MoveType.Unknown;
        }

        public Move(SquareBase from, SquareBase to, MoveType moveType = MoveType.Unknown)
        {
            From = from;
            To = to;
            MoveType = moveType;
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

        public static implicit operator Move(string value)
        {
            return FromString(value);
        }

        public static Move FromString(string value)
        {
            return new Move(value);
        }

        public void Execute(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var fromSquare = chessTable.Squares[From];

            if (fromSquare.State.CanCastle())
            {
                fromSquare.State = fromSquare.State.NoCastle();
                NoMoreCastle = true;
            }
            if (MoveType == MoveType.Hit || IsEnemyInCheck || IsEnemyInCheckMate)
            {
                Hit(chessTable);
            }
            chessTable.Squares[To].State = fromSquare.State;
            fromSquare.State = SquareState.Empty;

            chessTable.ClearEnPassantSquare();
            switch (MoveType)
            {
                case MoveType.Unknown:
                    Rollback(chessTable);
                    throw new InvalidOperationException("You should use verified moves on the board. Use one of the FigureMoveProviders.");
                case MoveType.Relocation:
                    SetEnPassantSquare(chessTable);
                    break;
                case MoveType.EnPassant:
                    EnPassant(chessTable);
                    break;
                case MoveType.Castle:
                    Castle(chessTable);
                    break;
                case MoveType.Promotion:
                    Promotion(chessTable);
                    break;
                case MoveType.Hit:
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        private void Promotion(ChessTable chessTable)
        {
            chessTable.Squares[To].State = To.Rank == Rank._8 ?
                SquareState.WhiteQueen : SquareState.BlackQueen;
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

        private void Hit(ChessTable chessTable)
        {
            CapturedFigure = chessTable.Squares[To].State;
        }

        private void SetEnPassantSquare(ChessTable chessTable)
        {
            var movedRanks = To.Rank - From.Rank;
            if (chessTable.Squares[To].State.HasPawn() && Math.Abs(movedRanks) == 2)
            {
                chessTable.Squares[From.Column, From.Rank + movedRanks / 2].State = SquareState.EnPassantEmpty;
            }
        }

        private void ClearEnPassantSquare(ChessTable chessTable)
        {
            var movedRanks = To.Rank - From.Rank;
            if (chessTable.Squares[From].State.HasPawn() && Math.Abs(movedRanks) == 2)
            {
                chessTable.Squares[From.Column, From.Rank + movedRanks / 2].State = SquareState.Empty;
            }
        }

        public void Rollback(ChessTable chessTable)
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
                    toSquare.State = CapturedFigure;
                    break;
                case MoveType.Unknown:
                    break;
                default:
                    throw new NotImplementedException();
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
    }
}
