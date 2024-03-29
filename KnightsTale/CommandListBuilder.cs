﻿using System;
using System.Collections.Generic;
using System.Linq;
using KnightsTaleUci.Commands;

namespace KnightsTaleUci
{
	class CommandListBuilder
	{
		public List<ICommand> GetCommandList()
		{
			var result = new List<ICommand>();

			var icommand = typeof(ICommand);
			var commandTypes = AppDomain.CurrentDomain.GetAssemblies()
				.SelectMany(assembly => assembly.GetTypes())
				.Where(type => !type.IsInterface && icommand.IsAssignableFrom(type) && !type.IsAbstract);

			foreach (var commandType in commandTypes)
			{
				var command = (ICommand)Activator.CreateInstance(commandType);
				result.Add(command);
			}

			return result;
		}
	}
}
