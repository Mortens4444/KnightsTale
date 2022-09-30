using Chess.Table;

namespace Chess.FigureValues
{
    public class FigureValueCalculator
    {
        public FigureValueCalculationMode FigureValueCalculationMode { get; }

        public FigureValueCalculator(FigureValueCalculationMode figureValueCalculationMode)
        {
            this.FigureValueCalculationMode = figureValueCalculationMode;
        }

        public double? GetValue(SquareState squareState)
        {
            double? result = null;
            if (squareState.HasPawn() || squareState == SquareState.EnPassantEmpty)
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.JacobSarratt:
                        return 2;
                    case FigureValueCalculationMode.JacobSarrattRoundedValues:
                        return 0.7;
                    case FigureValueCalculationMode.PaulRudolfVonBilguer:
                        return 1.5;
                    case FigureValueCalculationMode.ChessBook:
                        return 2.91;
                    case FigureValueCalculationMode.MortensV1:
                        return 1.955;
                    default: return 1;
                };
            }
            else if (squareState.HasKnight())
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.General:
                        return 3;
                    case FigureValueCalculationMode.JacobSarratt:
                        return 9.25;
                    case FigureValueCalculationMode.JacobSarrattRoundedValues:
                        return 3.1;
                    case FigureValueCalculationMode.HowardStauntonPeterPratt:
                        return 3.05;
                    case FigureValueCalculationMode.PaulRudolfVonBilguer:
                        return 5.3;
                    case FigureValueCalculationMode.YevgenyGik:
                        return 2.4;
                    case FigureValueCalculationMode.EmanuelLasker:
                        return 3;
                    case FigureValueCalculationMode.Burgess:
                        return 4.5;
                    case FigureValueCalculationMode.BobbyFischer:
                        return 3;
                    case FigureValueCalculationMode.Soltis2004:
                        return 3;
                    case FigureValueCalculationMode.ChessBook:
                        return 5.25;
                    case FigureValueCalculationMode.MortensV1:
                        return 4.125;
                    default:
                        return 3.5;
                };
            }
            else if (squareState.HasBishop())
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.General:
                        return 3;
                    case FigureValueCalculationMode.JacobSarratt:
                        return 9.75;
                    case FigureValueCalculationMode.JacobSarrattRoundedValues:
                        return 3.3;
                    case FigureValueCalculationMode.PaulRudolfVonBilguer:
                        return 5.3;
                    case FigureValueCalculationMode.YevgenyGik:
                        return 4;
                    case FigureValueCalculationMode.EmanuelLasker:
                        return 3;
                    case FigureValueCalculationMode.Burgess:
                        return 4.75;
                    case FigureValueCalculationMode.Evans1967:
                        return 3.75;
                    case FigureValueCalculationMode.BobbyFischer:
                        return 3.25;
                    case FigureValueCalculationMode.Soltis2004:
                        return 3;
                    case FigureValueCalculationMode.ChessBook:
                        return 8.75;
                    case FigureValueCalculationMode.MortensV1:
                        return 5.875;
                    default:
                        return 3.5;
                };
            }
            else if (squareState.HasRook())
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.JacobSarratt:
                        return 15;
                    case FigureValueCalculationMode.HowardStauntonPeterPratt:
                        return 5.48;
                    case FigureValueCalculationMode.PaulRudolfVonBilguer:
                        return 8.6;
                    case FigureValueCalculationMode.PaulRudolfNormalized:
                        return 5.7;
                    case FigureValueCalculationMode.YevgenyGik:
                        return 6.4;
                    case FigureValueCalculationMode.Burgess:
                        return 6.5;
                    case FigureValueCalculationMode.MaxEuweHansKramer:
                        return 5.5;
                    case FigureValueCalculationMode.Soltis2004:
                        return 4.5;
                    case FigureValueCalculationMode.ChessBook:
                        return 14;
                    case FigureValueCalculationMode.MortensV1:
                        return 9.5;
                    default:
                        return 5;
                };
            }
            else if (squareState.HasQueen())
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.General:
                        return 9;
                    case FigureValueCalculationMode.JacobSarratt:
                        return 23.75;
                    case FigureValueCalculationMode.JacobSarrattRoundedValues:
                        return 7.9;
                    case FigureValueCalculationMode.HowardStauntonPeterPratt:
                        return 9.94;
                    case FigureValueCalculationMode.PaulRudolfVonBilguer:
                        return 15.5;
                    case FigureValueCalculationMode.PaulRudolfNormalized:
                        return 10.3;
                    case FigureValueCalculationMode.YevgenyGik:
                        return 10.4;
                    case FigureValueCalculationMode.WorldChampionEmanuelLasker:
                        return 8.5;
                    case FigureValueCalculationMode.Burgess:
                        return 11;
                    case FigureValueCalculationMode.BobbyFischer:
                        return 9;
                    case FigureValueCalculationMode.SovietChessProgram:
                        return 9.5;
                    case FigureValueCalculationMode.Soltis2004:
                        return 9;
                    case FigureValueCalculationMode.ChessBook:
                        return 22.75;
                    case FigureValueCalculationMode.MortensV1:
                        return 15.875;
                    default:
                        return 10;
                };
            }
            else if (squareState.HasKing())
            {
                switch (FigureValueCalculationMode)
                {
                    case FigureValueCalculationMode.JacobSarratt:
                        return 6.5;
                    case FigureValueCalculationMode.JacobSarrattRoundedValues:
                        return 2.2;
                    case FigureValueCalculationMode.YevgenyGik:
                        return 3;
                    case FigureValueCalculationMode.EmanuelLasker:
                        return 4;
                    default:
                        return null;
                };
            }

            return result;
        }
    }
}
