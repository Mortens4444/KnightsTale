using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI;

public class Lvl1_KamikazeMoves : IArtificalIntelligence
{
    public Level Level { get; } = Level.Level_1;

    private readonly FigureValueCalculator figureValueCalculator;

    public Lvl1_KamikazeMoves(FigureValueCalculationMode figureValueCalculationMode)
    {
        figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
    }

    public Move GetMove(ChessTable chessTable)
    {
        Contract.Requires(chessTable != null);
        chessTable.DebugWriter($"{GetType().Name} searching for move...");

        var validMoves = chessTable.GetValidMoves();
        if (!validMoves.Any())
        {
            return null;
        }
        var hitMoves = validMoves
            .Where(validMove => validMove.MoveType == MoveType.Hit | validMove.MoveType == MoveType.EnPassant).ToList();
        if (hitMoves.Any())
        {
            var bestHit = hitMoves.OrderByDescending(hitMove => figureValueCalculator.GetValue(hitMove.To.State)).First();
            return bestHit;
        }
        return ArtificalIntelligence.GetRandomMove(validMoves);
    }
}
