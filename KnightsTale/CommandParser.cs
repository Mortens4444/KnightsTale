using System;
using System.Collections.Generic;
using System.Linq;
using KnightsTaleUci.Commands;

namespace KnightsTaleUci
{
	class CommandParser
	{
		private static readonly List<ICommand> commands;

		static CommandParser()
		{
			var commandListBuilder = new CommandListBuilder();
			commands = commandListBuilder.GetCommandList();
		}

		public ICommand TryParseCommand(string commandText)
		{
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
						cmd.Parameters.Add(commandSegments[i].ToLower());
					}
					return cmd;
				}

				i++;
			}

			return null;
		}
	}
}
