using System;

namespace Chess.AI
{
    public static class LevelToArtificalIntelligenceConverter
    {
        public static IArtificalIntelligence GetArtificalIntelligence(Level level)
        {
            switch (level)
            {
                case Level.Human:
                    return null;
                case Level.Level_0:
                    return new Lvl0_RandomMoves();
                case Level.Level_1:
                    return new Lvl1_KamikazeMoves(FigureValues.FigureValueCalculationMode.General);
                case Level.Level_2:
                    return new Lvl2_CarefulKamikazeMoves(FigureValues.FigureValueCalculationMode.General);
                case Level.Level_3:
                    return new Lvl3_NoMoreMoronMoves(FigureValues.FigureValueCalculationMode.General);
                case Level.Level_4:
                    return new Lvl4_NoMoreMoronMoves(FigureValues.FigureValueCalculationMode.General);
                default:
                    throw new NotImplementedException();
            };
        }
    }
}
