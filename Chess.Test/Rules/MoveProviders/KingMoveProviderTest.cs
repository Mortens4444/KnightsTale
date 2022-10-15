using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders;

public class KingMoveProviderTest : FigureMoveProviderTest
{
    protected override FigureMoveProvider FigureMoveProvider { get => new KingMoveProvider(); }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "E1", new string[] { "D2", "F2", "E2" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Opposition.cgs", "E4", new string[] { "D4", "F4", "E5", "E3", "D5", "D3", "F5", "F3" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Castling.cgs", "E1", new string[] { "D1", "F1", "E2", "D2", "F2", "C1", "G1" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Pawn Check.cgs", "E1", new string[] { "D1", "F1", "E2", "D2", "F2" })]
    public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
    {
        GetAllMoves(chessTableResourceName, from, allMoveDestinations);
    }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "E1", new string[] { "D2", "F2" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Opposition.cgs", "E4", new string[] { "D4", "F4", "E3", "D3", "F3" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Castling.cgs", "E1", new string[] { "D1", "F1", "E2" })]
    [TestCase("Chess.Test.Resources.ChessTableState - Pawn Check.cgs", "E1", new string[] { "D1" })]
    public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
    {
        GetValidMoves(chessTableResourceName, from, validMoveDestinations);
    }
}