using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI;

public class Lvl2_CarefulKamikazeMoves : IArtificalIntelligence, IMoveChooser
{
    public Level Level { get; } = Level.Level_2;

    private readonly FigureValueCalculator figureValueCalculator;
    private readonly Lvl1_KamikazeMoves lvl1_KamikazeMoves;

    public Lvl2_CarefulKamikazeMoves(FigureValueCalculationMode figureValueCalculationMode)
    {
        figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        lvl1_KamikazeMoves = new Lvl1_KamikazeMoves(figureValueCalculationMode);
    }

    public MoveDecisionHelper GetMoveDecisionHelper(ChessTable chessTable)
    {
        return ArtificalIntelligence.GetGoodMoves(chessTable, figureValueCalculator, lvl1_KamikazeMoves.GetMove, false);
    }

    public Move GetMove(ChessTable chessTable)
    {
        Contract.Requires(chessTable != null);
        chessTable.DebugWriter($"{GetType().Name} searching for move...");

        var moveDecisionHelper = GetMoveDecisionHelper(chessTable);
        if (moveDecisionHelper.GoodMovesWithGain.Any())
        {
            var bestHit = moveDecisionHelper.GoodMovesWithGain.OrderByDescending(goodMove => goodMove.Gain).FirstOrDefault();
            return bestHit.Move;
        }

        return ArtificalIntelligence.GetRandomMove(moveDecisionHelper.ValidMoves);
    }
}
