using Chess.Rules.Moves;
using System;

namespace Chess.CustomEventArgs;

public class PawnPromotionEventArgs : EventArgs
{
	public Move Move { get; set; }

    public PawnPromotionEventArgs(Move move)
	{
        Move = move;
	}
}
