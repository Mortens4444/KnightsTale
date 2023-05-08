using System;
using System.Threading;
using System.Threading.Tasks;

[assembly: CLSCompliant(false)]
namespace KnightsTaleUci
{
    /// <summary>
    /// https://backscattering.de/chess/uci/#engine-option
    /// </summary>
    public sealed class Program
	{
		static void Main(string[] args)
		{
			var cancellationToken = new CancellationToken();
			var task = Task.Run(() =>
			{
				var commandExecutor = new CommandExecutor();
				commandExecutor.Start(cancellationToken);
			});
			task.Wait();
		}
	}
}
