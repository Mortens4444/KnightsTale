using System.Threading;
using KnightsTaleUci.IO;

namespace KnightsTaleUci
{
	class CommandExecutor
	{
		public bool IsWorking { get; private set; }

		private readonly CommandBuilder commandBuilder;

		public CommandExecutor()
		{
			commandBuilder = new CommandBuilder();
		}

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
				var commandText = commandBuilder.Build(cancellationToken);
				if (!cancellationToken.IsCancellationRequested)
				{
					ExecuteCommand(commandText, cancellationToken);
				}
			}
		}

		private async void ExecuteCommand(string commandText, CancellationToken cancellationToken)
		{
			var commandParser = new CommandParser();
			var command = commandParser.TryParseCommand(commandText);

			while (command != null)
			{
				var response = await command.DoJobAndGetResponse(cancellationToken);
				Output.WriteLine(response);
				command = command.NextCommand;
			}
		}
	}
}
