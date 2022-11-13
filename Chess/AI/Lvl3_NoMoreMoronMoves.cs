using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI;

public class Lvl3_NoMoreMoronMoves : IArtificalIntelligence, IMoveChooser
{
    private static readonly List<MoveType> GoodMoveTypes = new List<MoveType> { MoveType.Hit, MoveType.Promotion, MoveType.Castle, MoveType.EnPassant };

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

        var moveDecisionHelper = GetMoveDecisionHelper(chessTable);
        if (moveDecisionHelper.GoodMovesWithGain.Any())
        {
            var bestHit = moveDecisionHelper.GoodMovesWithGain.OrderByDescending(goodMove => figureValueCalculator.GetValue(goodMove.Move.CapturedFigure)).FirstOrDefault();
            if (bestHit.Move != null)
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
            validMove.Execute(chessTable, true, false);

            var enemyMoveDecisionHelper = lvl2_CarefulKamikazeMoves.GetMoveDecisionHelper(chessTable);
            var enemyGoodMoves = enemyMoveDecisionHelper.GoodMovesWithGain.Select(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Move);

            if (enemyMoveDecisionHelper.GoodMovesWithGain.Any(enemyGoodMoveWithGain => enemyGoodMoveWithGain.Gain > 0))
            {
                noMoronMoves.Remove(validMove);
            }

            validMove.Rollback(chessTable, true, false);
        }

        return ArtificalIntelligence.GetRandomMove(noMoronMoves) ??
            ArtificalIntelligence.GetRandomMove(moveDecisionHelper.ValidMoves);
    }
}
