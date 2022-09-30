using System;

namespace Chess.Rules.Turns
{
    public class TurnControlEventArgs : EventArgs
    {
        public bool IsWhiteTurn { get; set; }

        public TurnControlEventArgs(bool isWhiteTurn)
        {
            IsWhiteTurn = isWhiteTurn;
        }
    }
}
