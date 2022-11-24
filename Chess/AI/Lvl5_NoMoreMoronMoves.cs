using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Diagnostics.Contracts;

namespace Chess.AI;

public class Lvl5_NoMoreMoronMoves : IArtificalIntelligence, IMoveChooser
{
    public Level Level { get; } = Level.Level_5;

    private readonly FigureValueCalculator figureValueCalculator;
    private readonly Lvl4_NoMoreMoronMoves lvl4_NoMoreMoronMoves;

    public Lvl5_NoMoreMoronMoves(FigureValueCalculationMode figureValueCalculationMode)
    {
        figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        lvl4_NoMoreMoronMoves = new Lvl4_NoMoreMoronMoves(figureValueCalculationMode);
    }

    public MoveDecisionHelper GetMoveDecisionHelper(ChessTable chessTable)
    {
        return ArtificalIntelligence.GetGoodMoves(chessTable, figureValueCalculator, lvl4_NoMoreMoronMoves.GetMove, true);
    }

    public Move GetMove(ChessTable chessTable)
    {
        Contract.Requires(chessTable != null);
        chessTable.DebugWriter($"{GetType().Name} searching for move...");
        return ArtificalIntelligence.GetMove(chessTable, lvl4_NoMoreMoronMoves.GetMoveDecisionHelper, figureValueCalculator);
    }
}
