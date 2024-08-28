using KnightsTaleUci.IO;
using System.Threading;

namespace KnightsTaleUci
{
    public sealed class CommandExecutor
	{
		public bool IsWorking { get; private set; }

		public void Start(CancellationToken cancellationToken)
		{
			IsWorking = true;
			ProcessCommands(cancellationToken);
		}

		public void Stop()
		{
			IsWorking = false;
		}

		void ProcessCommands(CancellationToken cancellationToken)
		{
			while (IsWorking && !cancellationToken.IsCancellationRequested)
			{
				var commandText = CommandBuilder.Build(cancellationToken);
				if (!cancellationToken.IsCancellationRequested)
				{
                    ExecuteCommand(commandText, cancellationToken);
				}
			}
		}

		private static async void ExecuteCommand(string commandText, CancellationToken cancellationToken)
		{
			var command = CommandParser.TryParseCommand(commandText);

			while (command != null)
			{
				var response = await command.DoJobAndGetResponse(cancellationToken).ConfigureAwait(false);
				Output.WriteLine(response);
				command = command.NextCommand;
			}
		}
	}
}
