using System.Threading;

namespace KnightsTaleUci.Commands
{
	/// <summary>
	/// position [ fen fenstring | startpos ] moves move1 ... movei
	/// set up the position described in fenstring on the internal board and play the moves on the internal chess board.
	/// if the game was played from the start position the string startpos will be sent
	/// Note: no "new" command is needed.However, if this position is from a different game than the last position sent to the engine, the GUI should have sent a ucinewgame inbetween.
	/// </summary>
	class Position : Command
	{
		protected override void DoAction(CancellationToken cancellationToken)
		{
			foreach (var parameter in Parameters)
            {
                _ = parameter switch
                {
                    "startpos" => 1,
                    _ => throw new System.NotImplementedException()
                };
            }
		}
	}
}
