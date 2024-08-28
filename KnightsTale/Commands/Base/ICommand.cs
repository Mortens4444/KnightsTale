using System;
using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace KnightsTaleUci.Commands;

public interface ICommand : ICloneable
{
	string Name { get; }

	Collection<string> Parameters { get; }

	Command NextCommand { get; }

	Task<string> DoJobAndGetResponse(CancellationToken cancellationToken);
}
