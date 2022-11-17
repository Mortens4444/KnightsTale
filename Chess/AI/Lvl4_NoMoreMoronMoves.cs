using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Diagnostics.Contracts;

namespace Chess.AI;

public class Lvl4_NoMoreMoronMoves : IArtificalIntelligence, IMoveChooser
{
    public Level Level { get; } = Level.Level_4;

    private readonly FigureValueCalculator figureValueCalculator;
    private readonly Lvl3_NoMoreMoronMoves lvl3_NoMoreMoronMoves;

    public Lvl4_NoMoreMoronMoves(FigureValueCalculationMode figureValueCalculationMode)
    {
        figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        lvl3_NoMoreMoronMoves = new Lvl3_NoMoreMoronMoves(figureValueCalculationMode);
    }

    public MoveDecisionHelper GetMoveDecisionHelper(ChessTable chessTable)
    {
        return ArtificalIntelligence.GetGoodMoves(chessTable, figureValueCalculator, lvl3_NoMoreMoronMoves.GetMove, true);
    }

    public Move GetMove(ChessTable chessTable)
    {
        Contract.Requires(chessTable != null);
        chessTable.DebugWriter($"{GetType().Name} searching for move...");
        return ArtificalIntelligence.GetMove(chessTable, lvl3_NoMoreMoronMoves.GetMoveDecisionHelper, figureValueCalculator);
    }
}
