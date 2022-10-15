using System.ComponentModel;

namespace Chess.FigureValues;

public enum FigureValueCalculationMode
{
    General,

    [Description("Jacob Sarratt")]
    JacobSarratt,

    [Description("Jacob Sarratt rounded values")]
    JacobSarrattRoundedValues,

    [Description("Howard Staunton, Peter Pratt")]
    HowardStauntonPeterPratt,

    [Description("Paul Rudolf von Bilguer")]
    PaulRudolfVonBilguer,

    [Description("Paul Rudolf normalized")]
    PaulRudolfNormalized,

    [Description("Yevgeny Gik")]
    YevgenyGik,

    [Description("Emanuel Lasker")]
    EmanuelLasker,

    [Description("World Champion Emanuel Lasker")]
    WorldChampionEmanuelLasker,

    Burgess,

    [Description("Evans 1967")]
    Evans1967,

    [Description("Max Euwe, Hans Kramer")]
    MaxEuweHansKramer,

    [Description("Bobby Fischer")]
    BobbyFischer,

    [Description("Soviet chess program")]
    SovietChessProgram,

    [Description("Soltis 2004")]
    Soltis2004,

    ChessBook,

    [Description("Mortens v1")]
    MortensV1
}
