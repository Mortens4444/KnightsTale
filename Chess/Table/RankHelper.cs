using Chess.Table.TableSquare;

namespace Chess.Table;

public static class RankHelper
{
	public static string ToString(Rank rank)
	{
		return rank.ToString().Substring(1);
	}
}
