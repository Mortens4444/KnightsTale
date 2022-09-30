using System.Collections.Generic;

namespace KnightsTaleUci.Commands
{
	class Options : Command
	{
		public override Command NextCommand => new UciOk();

		/// <summary>
		/// Send the options that can be changed.
		/// </summary>
		/// <returns></returns>
		protected override List<string> GetResponses()
		{
			return new List<string>
			{
				"option name Hash type spin default 1 min 1 max 128"
			};
		}
	}
}
