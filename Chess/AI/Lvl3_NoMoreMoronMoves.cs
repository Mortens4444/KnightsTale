using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.AI;

public class Lvl3_NoMoreMoronMoves : IArtificalIntelligence, IMoveChooser
{
    private static readonly List<MoveType> GoodMoveTypes = new() { MoveType.Hit, MoveType.Promotion, MoveType.Castle, MoveType.EnPassant };

    public Level Level { get; } = Level.Level_3;

    private readonly FigureValueCalculator figureValueCalculator;
    private readonly Lvl2_CarefulKamikazeMoves lvl2_CarefulKamikazeMoves;

    public Lvl3_NoMoreMoronMoves(FigureValueCalculationMode figureValueCalculationMode)
    {
        figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        lvl2_CarefulKamikazeMoves = new Lvl2_CarefulKamikazeMoves(figureValueCalculationMode);
    }

    public MoveDecisionHelper GetMoveDecisionHelper(ChessTable chessTable)
    {
        return ArtificalIntelligence.GetGoodMoves(chessTable, figureValueCalculator, lvl2_CarefulKamikazeMoves.GetMove, true, validMove => validMove.IsEnemyInCheck || validMove.IsEnemyInCheckMate || GoodMoveTypes.Contains(validMove.MoveType));
    }

    public Move GetMove(ChessTable chessTable)
    {
        Contract.Requires(chessTable != null);
        chessTable.DebugWriter($"{GetType().Name} searching for move...");
        return ArtificalIntelligence.GetMove(chessTable, lvl2_CarefulKamikazeMoves.GetMoveDecisionHelper, figureValueCalculator);
    }
}
