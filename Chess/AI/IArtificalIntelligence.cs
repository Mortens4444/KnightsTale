using Chess.Rules.Moves;
using Chess.Table;

namespace Chess.AI
{
    public interface IArtificalIntelligence
    {
        Level Level { get; }

        Move GetMove(ChessTable chessTable);
    }
}