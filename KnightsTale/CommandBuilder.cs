using System;
using System.Threading;
using KnightsTaleUci.IO;

namespace KnightsTaleUci
{
    public sealed class CommandBuilder
	{
		public static string Build(CancellationToken cancellationToken)
		{
			int ch;
			var command = String.Empty;

			do
			{
				ch = Input.Read();
				if (ch != -1 && !IsNewLineChar(ch))
				{
					command += (char)ch;
				}

			} while (!IsNewLineChar(ch) && !cancellationToken.IsCancellationRequested);

			return command;
		}

		private static bool IsNewLineChar(int ch)
		{
			return ch == '\r' || ch == '\n';
		}
	}
}
