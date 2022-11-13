using Chess.Rules.Moves;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Table.TableSquare;

public class Square : IEquatable<Square>
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
    {
        Value = (byte)((byte)column * 10 + (byte)rank);
        Column = column;
        Rank = rank;
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
               State.HasKing() ?
                    MoveType.CheckMate :
                    MoveType.Hit;
    }

    public Column Column { get; private set; }

    public Rank Rank { get; private set; }

    public string Name
    {
        get
        {
            return String.Concat(Column.ToString(), RankHelper.ToString(Rank));
        }
    }

    public bool Equals(Square other)
    {
        if (other == null)
        {
            return false;
        }

        return Column == other.Column && Rank == other.Rank;
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as Square);
    }

    public override int GetHashCode()
    {
        return (int)Column;
    }
}