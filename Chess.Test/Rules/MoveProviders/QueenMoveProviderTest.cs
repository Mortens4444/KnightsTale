using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders;

public class QueenMoveProviderTest : FigureMoveProviderTest
{
    protected override FigureMoveProvider FigureMoveProvider { get => new QueenMoveProvider(); }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "D1", new string[] { "D2", "E2", "F3", "G4" })]
    public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
    {
        GetAllMoves(chessTableResourceName, from, allMoveDestinations);
    }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "D1", new string[] { "D2", "E2", "F3", "G4" })]
    public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
    {
        GetValidMoves(chessTableResourceName, from, validMoveDestinations);
    }
}