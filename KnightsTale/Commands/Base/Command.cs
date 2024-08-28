using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace KnightsTaleUci.Commands;

public abstract class Command : ICommand
{
	public string Name => GetType().Name.ToLowerInvariant();

	public virtual Collection<string> Parameters => new();

	public virtual Command NextCommand => null;

	public object Clone()
	{
		return Activator.CreateInstance(GetType());
	}

	public async Task<string> DoJobAndGetResponse(CancellationToken cancellationToken)
	{
		return await Task.Run(() =>
		{
			DoAction(cancellationToken);
			return GetFormattedResponses();
		}).ConfigureAwait(false);
	}

	protected virtual void DoAction(CancellationToken cancellationToken) { }

	protected virtual string GetResponse()
	{
		return String.Empty;
	}

	protected virtual IList<string> GetResponses()
	{
		return new List<string> { };
	}

	private string GetFormattedResponses()
	{
		var responses = GetResponses();
		if (responses.Any())
		{
			return String.Concat(String.Join('\n', responses), "\n");
		}

		return String.Concat(GetResponse(), "\n");
	}
}
