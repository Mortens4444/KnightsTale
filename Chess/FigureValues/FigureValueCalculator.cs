using Chess.Table;

namespace Chess.FigureValues;

public class FigureValueCalculator
{
    public FigureValueCalculationMode FigureValueCalculationMode { get; }

    public FigureValueCalculator(FigureValueCalculationMode figureValueCalculationMode)
    {
        this.FigureValueCalculationMode = figureValueCalculationMode;
    }

    public double GetCheckValue()
    {
        // Get a better way to calculate this value, as BestMoveForBlack and BestMoveForBlack 2 test are failing because of this. (Try to return 10, and the tests will pass.)
        var pawnValue = GetValue(SquareState.WhitePawn);
        return pawnValue.HasValue ? pawnValue.Value / 2 : 0.5;
    }

    public double? GetValue(SquareState squareState)
    {
        double? result = null;
        if (squareState.HasPawn() || squareState == SquareState.EnPassantEmpty)
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.JacobSarratt => (double?)2,
                FigureValueCalculationMode.JacobSarrattRoundedValues => 0.7,
                FigureValueCalculationMode.PaulRudolfVonBilguer => 1.5,
                FigureValueCalculationMode.ChessBook => 2.91,
                FigureValueCalculationMode.MortensV1 => 1.955,
                _ => (double?)1,
            };
            ;
        }
        else if (squareState.HasKnight())
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.General => (double?)3,
                FigureValueCalculationMode.JacobSarratt => 9.25,
                FigureValueCalculationMode.JacobSarrattRoundedValues => 3.1,
                FigureValueCalculationMode.HowardStauntonPeterPratt => 3.05,
                FigureValueCalculationMode.PaulRudolfVonBilguer => 5.3,
                FigureValueCalculationMode.YevgenyGik => 2.4,
                FigureValueCalculationMode.EmanuelLasker => (double?)3,
                FigureValueCalculationMode.Burgess => 4.5,
                FigureValueCalculationMode.BobbyFischer => (double?)3,
                FigureValueCalculationMode.Soltis2004 => (double?)3,
                FigureValueCalculationMode.ChessBook => 5.25,
                FigureValueCalculationMode.MortensV1 => 4.125,
                _ => 3.5,
            };
            ;
        }
        else if (squareState.HasBishop())
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.General => (double?)3,
                FigureValueCalculationMode.JacobSarratt => 9.75,
                FigureValueCalculationMode.JacobSarrattRoundedValues => 3.3,
                FigureValueCalculationMode.PaulRudolfVonBilguer => 5.3,
                FigureValueCalculationMode.YevgenyGik => (double?)4,
                FigureValueCalculationMode.EmanuelLasker => (double?)3,
                FigureValueCalculationMode.Burgess => 4.75,
                FigureValueCalculationMode.Evans1967 => 3.75,
                FigureValueCalculationMode.BobbyFischer => 3.25,
                FigureValueCalculationMode.Soltis2004 => (double?)3,
                FigureValueCalculationMode.ChessBook => 8.75,
                FigureValueCalculationMode.MortensV1 => 5.875,
                _ => 3.5,
            };
            ;
        }
        else if (squareState.HasRook())
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.JacobSarratt => (double?)15,
                FigureValueCalculationMode.HowardStauntonPeterPratt => 5.48,
                FigureValueCalculationMode.PaulRudolfVonBilguer => 8.6,
                FigureValueCalculationMode.PaulRudolfNormalized => 5.7,
                FigureValueCalculationMode.YevgenyGik => 6.4,
                FigureValueCalculationMode.Burgess => 6.5,
                FigureValueCalculationMode.MaxEuweHansKramer => 5.5,
                FigureValueCalculationMode.Soltis2004 => 4.5,
                FigureValueCalculationMode.ChessBook => (double?)14,
                FigureValueCalculationMode.MortensV1 => 9.5,
                _ => (double?)5,
            };
            ;
        }
        else if (squareState.HasQueen())
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.General => (double?)9,
                FigureValueCalculationMode.JacobSarratt => 23.75,
                FigureValueCalculationMode.JacobSarrattRoundedValues => 7.9,
                FigureValueCalculationMode.HowardStauntonPeterPratt => 9.94,
                FigureValueCalculationMode.PaulRudolfVonBilguer => 15.5,
                FigureValueCalculationMode.PaulRudolfNormalized => 10.3,
                FigureValueCalculationMode.YevgenyGik => 10.4,
                FigureValueCalculationMode.WorldChampionEmanuelLasker => 8.5,
                FigureValueCalculationMode.Burgess => (double?)11,
                FigureValueCalculationMode.BobbyFischer => (double?)9,
                FigureValueCalculationMode.SovietChessProgram => 9.5,
                FigureValueCalculationMode.Soltis2004 => (double?)9,
                FigureValueCalculationMode.ChessBook => 22.75,
                FigureValueCalculationMode.MortensV1 => 15.875,
                _ => (double?)10,
            };
            ;
        }
        else if (squareState.HasKing())
        {
            return FigureValueCalculationMode switch
            {
                FigureValueCalculationMode.JacobSarratt => 6.5,
                FigureValueCalculationMode.JacobSarrattRoundedValues => 2.2,
                FigureValueCalculationMode.YevgenyGik => (double?)3,
                FigureValueCalculationMode.EmanuelLasker => (double?)4,
                _ => null,
            };
            ;
        }

        return result;
    }
}
