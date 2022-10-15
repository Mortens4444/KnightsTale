using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

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

        var moveDecisionHelper = GetMoveDecisionHelper(chessTable);
        if (moveDecisionHelper.GoodMovesWithGain.Any())
        {
            var bestHit = moveDecisionHelper.GoodMovesWithGain.OrderByDescending(goodMove => figureValueCalculator.GetValue(goodMove.Move.CapturedFigure)).FirstOrDefault();
            if (bestHit != null)
            {
                return bestHit.Move;
            }
        }

        var noMoronMoves = new List<Move>(moveDecisionHelper.ValidMoves);
        foreach (var validMove in moveDecisionHelper.ValidMoves)
        {
            if (!noMoronMoves.Any())
            {
                break;
            }
            validMove.Execute(chessTable);
            chessTable.TurnControl.ChangeTurn(false);

            var enemyMoveDecisionHelper = lvl3_NoMoreMoronMoves.GetMoveDecisionHelper(chessTable);
            var enemyGoodMoves = enemyMoveDecisionHelper.GoodMovesWithGain.Select(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Move);

            if (enemyMoveDecisionHelper.GoodMovesWithGain.Any(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Gain > 0))
            {
                noMoronMoves.Remove(validMove);
            }

            validMove.Rollback(chessTable);
            chessTable.TurnControl.ChangeTurn(false);
        }
        
        return ArtificalIntelligence.GetRandomMove(noMoronMoves) ??
            ArtificalIntelligence.GetRandomMove(moveDecisionHelper.ValidMoves);
    }
}
