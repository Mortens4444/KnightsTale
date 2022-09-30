using System;

namespace KnightsTaleUci.IO
{
	static class Output
	{
		public static void WriteLine(string value)
		{
			Console.WriteLine(value);
		}

		public static void DebugWriteLine(string value)
		{
			if (Settings.IsDebug)
			{
				Console.WriteLine(value);
			}
		}
	}
}
