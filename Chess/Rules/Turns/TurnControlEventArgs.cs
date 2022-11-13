using Chess.Rules.Moves;
using System;

namespace Chess.Rules.Turns
{
    public class TurnControlEventArgs : EventArgs
    {
        public bool IsWhiteTurn { get; set; }

        public Move LastMove { get; set; }

        public TurnControlEventArgs(Move lastMove, bool isWhiteTurn)
        {
            LastMove = lastMove;
            IsWhiteTurn = isWhiteTurn;
        }
    }
}
