using Chess.Rules.MoveProviders;
using NUnit.Framework;

namespace Chess.Test.Rules.MoveProviders
{
    public class KnightMoveProviderTest : FigureMoveProviderTest
    {
        protected override FigureMoveProvider FigureMoveProvider { get => new KnightMoveProvider(); }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", "B1", new string[] { "A3", "C3", "D2" })]
        public void GetAllMovesTest(string chessTableResourceName, string from, params string[] allMoveDestinations)
        {
            GetAllMoves(chessTableResourceName, from, allMoveDestinations);
        }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", "B1", new string[] { "A3", "C3", "D2" })]
        public void GetValidMovesTest(string chessTableResourceName, string from, params string[] validMoveDestinations)
        {
            GetValidMoves(chessTableResourceName, from, validMoveDestinations);
        }
    }
}