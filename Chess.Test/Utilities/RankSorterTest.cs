using Chess.Table.TableSquare;
using Chess.Utilities;
using NUnit.Framework;
using NUnit.Framework.Legacy;
using System.Linq;

namespace Chess.Test.Utilities;

public class RankSorterTest
{
    [Test]
    public void SortRanksTest()
    {
        var ranks = Utils.GetEnumValues<Rank>().ToList();
        ranks.Sort(new ReverseRankSorter());
        ClassicAssert.AreEqual(Rank._8, ranks[0]);
    }
}