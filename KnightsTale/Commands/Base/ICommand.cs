using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace KnightsTaleUci.Commands
{
	interface ICommand : ICloneable
	{
		string Name { get; }

		List<string> Parameters { get; }

		Command NextCommand { get; }

		Task<string> DoJobAndGetResponse(CancellationToken cancellationToken);
	}
}
