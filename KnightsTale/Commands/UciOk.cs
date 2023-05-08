using System.Collections.Generic;

namespace KnightsTaleUci.Commands
{
    /// <summary>
    /// uciok
    /// </summary>
    public sealed class UciOk : Command
	{
		protected override List<string> GetResponses()
		{
			return new List<string>
			{
				"uciok"
			};
		}
	}
}
