using System;
using System.Diagnostics.Contracts;

namespace Chess.Table.TableSquare
{
    public class SquareBase : IEquatable<SquareBase>
    {
        public Column Column { get; private set; }

        public Rank Rank { get; private set; }

        public string Name
        {
            get
            {
                return String.Concat(Column.ToString(), RankHelper.ToString(Rank));
            }
        }

        public SquareBase(string squareName)
        {
            Contract.Requires(squareName != null);

            Column = (Column)(Char.ToUpper(squareName[0]) - 'A');
            Rank = (Rank)(squareName[1] - '1');
        }

        public SquareBase(Column column, Rank rank)
        {
            Column = column;
            Rank = rank;
        }

        public bool Equals(SquareBase other)
        {
            if (other == null)
            {
                return false;
            }

            return Column == other.Column && Rank == other.Rank;
        }

        public override string ToString()
        {            
            return Name.ToLower();
        }

        public static implicit operator SquareBase(string squareName)
        {
            return FromString(squareName);
        }

        public static SquareBase FromString(string squareName)
        {
            Contract.Requires(squareName != null);

            return new SquareBase((Column) Enum.Parse(typeof(Column), squareName[0].ToString(), true),
                (Rank) Enum.Parse(typeof(Rank), $"_{squareName[1]}", true));
        }

        public override bool Equals(object obj)
        {
            return Equals(obj as SquareBase);
        }

        public override int GetHashCode()
        {
            return (int)Column;
        }
    }
}