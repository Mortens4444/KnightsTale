using Chess.Table.TableSquare;
using System.Collections.Generic;

namespace Chess.Utilities
{
    public class ReverseRankSorter : IComparer<Rank>
    {
        public int Compare(Rank x, Rank y)
        {
            return (int)y - (int)x;
        }
    }
}
