using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders;

public class PawnMoveProviderTest : FigureMoveProviderTest
{
    protected override FigureMoveProvider FigureMoveProvider { get => new PawnMoveProvider(); }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "A2", new string[] { "A3", "A4" })]
    [TestCase("Chess.Test.Resources.ChessTableState - EnPassant.cgs", "D5", new string[] { "C6", "D6" })]
    public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
    {
        GetAllMoves(chessTableResourceName, from, allMoveDestinations);
    }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "A2", new string[] { "A3", "A4" })]
    [TestCase("Chess.Test.Resources.ChessTableState - EnPassant.cgs", "D5", new string[] { "C6", "D6" })]
    public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
    {
        GetValidMoves(chessTableResourceName, from, validMoveDestinations);
    }
}