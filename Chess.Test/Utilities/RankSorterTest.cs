using Chess.Table.TableSquare;
using Chess.Utilities;
using NUnit.Framework;
using System.Linq;

namespace Chess.Test.Utilities;

public class RankSorterTest
{
    [Test]
    public void SortRanksTest()
    {
        var ranks = Utils.GetEnumValues<Rank>().ToList();
        ranks.Sort(new ReverseRankSorter());
        Assert.AreEqual(Rank._8, ranks.First());
    }
}