﻿namespace KnightsTaleUci.Commands
{
	/// <summary>
	/// ponderhit
	/// the user has played the expected move.This will be sent if the engine was told to ponder on the same move the user has played.The engine should continue searching but switch from pondering to normal search.
	/// </summary>
	class PonderHit : Command
	{
	}
}
