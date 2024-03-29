using KnightsTaleUci.Commands;
using System;
using System.Collections.Generic;

namespace KnightsTaleUci;

public static class CommandParser
{
	private static readonly List<ICommand> commands = CommandListBuilder.GetCommandList();

	public static ICommand TryParseCommand(string commandText)
	{
            ArgumentNullException.ThrowIfNull(commandText);

            var commandSegments = commandText.Split(' ', '\t', StringSplitOptions.RemoveEmptyEntries);

		int i = 0;
		while (i < commandSegments.Length)
		{
			var commandToExecute = commands.Find(command => command.Name == commandSegments[i]);
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
