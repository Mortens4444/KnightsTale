using KnightsTaleUci.Commands;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KnightsTaleUci
{
    public sealed class CommandParser
	{
		private static readonly List<ICommand> commands = CommandListBuilder.GetCommandList();

		public static ICommand TryParseCommand(string commandText)
		{
			if (commandText == null)
			{
				throw new ArgumentNullException(nameof(commandText));
			}

			var commandSegments = commandText.Split(' ', '\t', StringSplitOptions.RemoveEmptyEntries);

			int i = 0;
			while (i < commandSegments.Length)
			{
				var commandToExecute = commands.FirstOrDefault(command => command.Name == commandSegments[i]);
				if (commandToExecute != null)
				{
					var cmd = (Command)commandToExecute.Clone();
					while (++i < commandSegments.Length)
					{
						cmd.Parameters.Add(commandSegments[i].ToLowerInvariant());
					}
					return cmd;
				}

				i++;
			}

			return null;
		}
	}
}
