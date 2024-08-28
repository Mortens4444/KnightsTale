using Chess.Table;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace Chess.Test.Utilities;

public class SquareStateTest
{
    [TestCase(SquareState.Empty, " ", " ", TestName = "Test empty square")]
    [TestCase(SquareState.WhitePawn, "♙", "p", TestName = "Test white pawn")]
    [TestCase(SquareState.WhiteBishop, "♗", "b", TestName = "Test white bishop")]
    [TestCase(SquareState.BlackQueen, "♛", "Q", TestName = "Test black queen")]
    public void SquareStateToStringTest(SquareState squareState, string displayText, string notationText)
    {
        var text = squareState.ToString();
        ClassicAssert.AreEqual(text, squareState.ToString(SquareInfoMode.LongName));
        ClassicAssert.AreEqual(displayText, squareState.ToString(SquareInfoMode.Display));
        ClassicAssert.AreEqual(notationText, squareState.ToString(SquareInfoMode.Notation));
        ClassicAssert.AreEqual($"{(char)squareState}", squareState.ToString(SquareInfoMode.Store));
    }
}