using System.Threading;

namespace KnightsTaleUci.Commands
{
    /// <summary>
    /// setoption name id [ value x ]
    /// this is sent to the engine when the user wants to change the internal parameters of the engine.For the button type no value is needed.
    /// One string will be sent for each parameter and this will only be sent when the engine is waiting.The name and value of the option in id should not be case sensitive and can inlude spaces.
    /// The substrings value and name should be avoided in id and x to allow unambiguous parsing, for example do not use name = draw value.
    /// Here are some strings for the example below:
    /// setoption name Nullmove value true\n
    /// setoption name Selectivity value 3\n
    /// setoption name Style value Risky\n
    /// setoption name Clear Hash\n
    /// setoption name NalimovPath value c:\chess\tb\4; c:\chess\tb\5\n
    /// </summary>
    public sealed class SetOption : Command
	{
        protected override void DoAction(CancellationToken cancellationToken)
        {
            if (Parameters[0] == "name" && Parameters[2] == "value")
            {
				Settings.All[Parameters[1]] = Parameters[3];
			}
        }
    }
}
