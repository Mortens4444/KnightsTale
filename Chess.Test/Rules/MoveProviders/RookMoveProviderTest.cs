using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders;

public class RookMoveProviderTest : FigureMoveProviderTest
{
    protected override FigureMoveProvider FigureMoveProvider { get => new RookMoveProvider(); }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "A1", new string[] { })]
    public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
    {
        GetAllMoves(chessTableResourceName, from, allMoveDestinations);
    }

    [TestCase("Chess.Test.Resources.ChessTableState.cgs", "A1", new string[] { })]
    public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
    {
        GetValidMoves(chessTableResourceName, from, validMoveDestinations);
    }
}