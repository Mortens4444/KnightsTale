using Chess.Rules.Moves;
using Chess.Table;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI
{
    public class Lvl0_RandomMoves : IArtificalIntelligence
    {
        public Level Level { get; } = Level.Level_0;

        public Move GetMove(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var validMoves = chessTable.GetValidMoves();
            if (!validMoves.Any())
            {
                return null;
            }
            return ArtificalIntelligence.GetRandomMove(validMoves);
        }
    }
}
