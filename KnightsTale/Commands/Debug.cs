using System.Threading;

namespace KnightsTaleUci.Commands
{
    /// <summary>
    /// debug [ on | off ]
    /// switch the debug mode of the engine on and off.In debug mode the engine should send additional infos to the GUI, e.g.with the info string command, to help debugging, e.g.the commands that the engine has received etc.
    /// This mode should be switched off by default and this command can be sent any time, also when the engine is thinking.
    /// </summary>
    public sealed class Debug : Command
	{
		protected override void DoAction(CancellationToken cancellationToken)
		{
			Settings.IsDebug = Parameters[0] switch
            {
                "on" => true,
                "off" => false,
                _ => Settings.IsDebug
			};
		}
	}
}
