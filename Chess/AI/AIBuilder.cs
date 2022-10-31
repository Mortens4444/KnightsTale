using Chess.FigureValues;
using System;

namespace Chess.AI
{
    public static class AIBuilder
    {
        public static IArtificalIntelligence GetAI(Level level, FigureValueCalculationMode figureValueCalculationMode)
        {
            switch (level)
            {
                case Level.Human:
                    return null;
                case Level.Level_0:
                    return new Lvl0_RandomMoves();
                case Level.Level_1:
                    return new Lvl1_KamikazeMoves(figureValueCalculationMode);
                case Level.Level_2:
                    return new Lvl2_CarefulKamikazeMoves(figureValueCalculationMode);
                case Level.Level_3:
                    return new Lvl3_NoMoreMoronMoves(figureValueCalculationMode);
                case Level.Level_4:
                    return new Lvl4_NoMoreMoronMoves(figureValueCalculationMode);
                default:
                    throw new NotImplementedException();
            }
        }
    }
}
