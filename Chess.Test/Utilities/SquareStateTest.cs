using Chess.Table;
using NUnit.Framework;

namespace Chess.Test.Utilities
{
    public class SquareStateTest
    {
        [TestCase(SquareState.Empty, " ", " ", TestName = "Test empty square")]
        [TestCase(SquareState.WhitePawn, "♙", "p", TestName = "Test white pawn")]
        [TestCase(SquareState.WhiteBishop, "♗", "b", TestName = "Test white bishop")]
        [TestCase(SquareState.BlackQueen, "♛", "Q", TestName = "Test black queen")]
        public void SquareStateToStringTest(SquareState squareState, string displayText, string notationText)
        {
            var text = squareState.ToString();
            Assert.AreEqual(text, squareState.ToString(SquareInfoMode.LongName));
            Assert.AreEqual(displayText, squareState.ToString(SquareInfoMode.Display));
            Assert.AreEqual(notationText, squareState.ToString(SquareInfoMode.Notation));
            Assert.AreEqual($"{(char)squareState}", squareState.ToString(SquareInfoMode.Store));
        }
    }
}