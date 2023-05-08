using System.Diagnostics.CodeAnalysis;

namespace KnightsTaleUci.Commands
{
    /// <summary>
    /// stop
    /// stop calculating as soon as possible,
    /// don't forget the bestmove and possibly the ponder token when finishing the search
    /// </summary>
    [SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "Intentional use of 'Stop' as the class name")]
    public sealed class Stop : Command
	{
	}
}
