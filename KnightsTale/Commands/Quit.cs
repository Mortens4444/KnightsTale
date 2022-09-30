using System;
using System.Threading;

namespace KnightsTaleUci.Commands
{
	class Quit : Command
	{
		/// <summary>
		/// quit
		/// quit the program as soon as possible
		/// </summary>
		protected override void DoAction(CancellationToken cancellationToken)
		{
			Environment.Exit(0);
		}
	}
}
