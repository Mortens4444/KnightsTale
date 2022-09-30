using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.AI
{
    public class Lvl2_CarefulKamikazeMoves : IArtificalIntelligence
    {
        public Level Level { get; } = Level.Level_2;

        private readonly FigureValueCalculator figureValueCalculator;
        private readonly Lvl1_KamikazeMoves lvl1_KamikazeMoves;

        public Lvl2_CarefulKamikazeMoves(FigureValueCalculationMode figureValueCalculationMode)
        {
            figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
            lvl1_KamikazeMoves = new Lvl1_KamikazeMoves(figureValueCalculationMode);
        }

        public MoveDecisionHelper GetMoves(ChessTable chessTable)
        {
            Contract.Requires(chessTable != null);

            var goodMovesWithGain = new List<MoveWithGainInfo>();
            var validMoves = chessTable.GetValidMoves();
            if (!validMoves.Any())
            {
                return new MoveDecisionHelper(validMoves, new List<MoveWithGainInfo>());
            }

            var allMoves = validMoves
                .Select(validMove => new MoveWithDestinationSquareInfo { ValidMove = validMove, To = chessTable.Squares[validMove.To] });

            ArtificalIntelligence.CheckMoves(chessTable, figureValueCalculator, goodMovesWithGain, allMoves, lvl1_KamikazeMoves.GetMove, false);
            return new MoveDecisionHelper(validMoves, goodMovesWithGain);
        }

        public Move GetMove(ChessTable chessTable)
        {
            var moveDecisionHelper = GetMoves(chessTable);
            if (moveDecisionHelper.GoodMovesWithGain.Any())
            {
                var bestHit = moveDecisionHelper.GoodMovesWithGain.OrderByDescending(goodMove => goodMove.Gain).FirstOrDefault();
                return bestHit.Move;
            }

            return ArtificalIntelligence.GetRandomMove(moveDecisionHelper.ValidMoves);
        }
    }
}
