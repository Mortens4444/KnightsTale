using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders
{
    public class BishopMoveProviderTest : FigureMoveProviderTest
    {
        protected override FigureMoveProvider FigureMoveProvider { get => new BishopMoveProvider(); }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", "C1", new string[] { "D2", "E3" })]
        public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
        {
            GetAllMoves(chessTableResourceName, from, allMoveDestinations);
        }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", "C1", new string[] { "D2", "E3" })]
        public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
        {
            GetValidMoves(chessTableResourceName, from, validMoveDestinations);
        }
    }
}