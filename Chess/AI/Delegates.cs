using Chess.Rules.Moves;
using Chess.Table;

namespace Chess.AI
{
    public abstract class Delegates
    {
        public delegate MoveDecisionHelper MoveDecisionHelperCallback(ChessTable chessTable);
    }
}
