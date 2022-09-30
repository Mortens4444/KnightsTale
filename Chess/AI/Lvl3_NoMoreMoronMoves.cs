using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI
{
    public class Lvl3_NoMoreMoronMoves : IArtificalIntelligence
    {
        private static readonly List<MoveType> GoodMoveTypes = new List<MoveType> { MoveType.Hit, MoveType.Promotion, MoveType.Castle, MoveType.EnPassant, MoveType.Check };

        public Level Level { get; } = Level.Level_3;

        private readonly FigureValueCalculator figureValueCalculator;
        private readonly Lvl2_CarefulKamikazeMoves lvl2_CarefulKamikazeMoves;

        public Lvl3_NoMoreMoronMoves(FigureValueCalculationMode figureValueCalculationMode)
        {
            figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
            lvl2_CarefulKamikazeMoves = new Lvl2_CarefulKamikazeMoves(figureValueCalculationMode);
        }

        public MoveDecisionHelper GetMoves(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var goodMovesWithGainInfo = new List<MoveWithGainInfo>();
            var validMoves = chessTable.GetValidMoves();
            if (!validMoves.Any())
            {
                return new MoveDecisionHelper(validMoves, new List<MoveWithGainInfo>());
            }

            var allGoodMoves = validMoves
                .Where(validMove => GoodMoveTypes.Contains(validMove.MoveType))
                .Select(validMove => new MoveWithDestinationSquareInfo { ValidMove = validMove, To = chessTable.Squares[validMove.To] });

            ArtificalIntelligence.CheckMoves(chessTable, figureValueCalculator, goodMovesWithGainInfo, allGoodMoves, lvl2_CarefulKamikazeMoves.GetMove, true);
            return new MoveDecisionHelper(validMoves, goodMovesWithGainInfo);
        }

        public Move GetMove(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var moveDecisionHelper = GetMoves(chessTable);
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
                validMove.Execute(chessTable);
                chessTable.TurnControl.ChangeTurn(false);

                var enemyMoveDecisionHelper = lvl2_CarefulKamikazeMoves.GetMoves(chessTable);
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
}
