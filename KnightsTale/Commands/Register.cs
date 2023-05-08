namespace KnightsTaleUci.Commands
{
    /// <summary>
    /// register
    /// this is the command to try to register an engine or to tell the engine that registration will be done later.This command should always be sent if the engine has sent registration error at program startup.
    /// The following tokens are allowed:
    /// 
    /// later
    /// the user doesn't want to register the engine now.
    /// 
    /// name x
    /// the engine should be registered with the name x
    /// 
    /// code y
    /// the engine should be registered with the code y
    /// 
    /// Example:
    /// register later
    /// register name Stefan MK code 4359874324
    /// </summary>
    public sealed class Register : Command
	{
	}
}
