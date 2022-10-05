using Chess.Rules.Moves;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Table.TableSquare
{
    public class Square : SquareBase
    {
        public SquareState State { get; set; }

        public byte Value { get; private set; }

        public bool PossibleSelected { get; set; }

        public SquareColor Color
        {
            get
            {
                return GetColor(Column, Rank);
            }
        }

        public static SquareColor GetColor(Column column, Rank rank)
        {
            return ((int)column + (int)rank) % 2 == 0 ? SquareColor.Black : SquareColor.White;
        }

        public Square(Column column, Rank rank)
            : base(column, rank)
        {
            Value = (byte)((byte)column * 10 + (byte)rank);
        }

        public string ToUpperString()
        {
            return Name;
        }

        public override string ToString()
        {
            if (State.HasFigure())
            {
                return $"{Name.ToLower()} - {State}";
            }

            return Name.ToLower();
        }

        public string ToString(Square from)
        {
            Contract.Requires(from != null);

            return from.Column == Column ? RankHelper.ToString(Rank) : ToString();
        }

        public int GetDistance(Square other)
        {
            if (other == null)
            {
                throw new ArgumentNullException(nameof(other));
            }

            return Math.Abs(Column - other.Column) + Math.Abs(Rank - other.Rank);
        }

        public int CompareTo(Square other)
        {
            return GetDistance(other);
        }

        public bool IsInCheck(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var enemyFigures = State.HasWhiteFigure() ?
                chessTable.Squares.GetAllBlackFigureSquares() :
                chessTable.Squares.GetAllWhiteFigureSquares();

            var enemyMoves = chessTable.GetAllMoves(enemyFigures);
            return enemyMoves.Any(enemyMove => enemyMove.To == this);
        }

        public MoveType GetMoveType()
        {
            return State.IsEmpty() ?
                       MoveType.Relocation :
                       MoveType.Hit;
        }
    }
}