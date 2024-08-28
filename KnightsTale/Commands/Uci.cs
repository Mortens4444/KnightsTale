using System.Collections.Generic;

namespace KnightsTaleUci.Commands;

/// <summary>
/// uci
/// tell engine to use the uci (universal chess interface), this will be sent once as a first command after program boot to tell the engine to switch to uci mode.
/// After receiving the uci command the engine must identify itself with the id command and send the option commands to tell the GUI which engine settings the engine supports if any.
/// After that the engine should send uciok to acknowledge the uci mode.If no uciok is sent within a certain time period, the engine task will be killed by the GUI.
/// </summary>
public sealed class Uci : Command
{
	public override Command NextCommand => new Options();

	protected override List<string> GetResponses()
	{
		return new List<string>
		{
			"id name Knigth's Tale",
			"id author Mortens (Tibor Papp)"
		};
	}
}
