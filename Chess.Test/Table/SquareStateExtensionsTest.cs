using Chess.Table;
using NUnit.Framework;

namespace Chess.Test.Table;

public class SquareStateExtensionsTest
{
    [TestCase(SquareState.EnPassantEmpty, false, TestName = "Test if en passant square has black figure")]
    [TestCase(SquareState.WhiteKing, false, TestName = "Test white king")]
    [TestCase(SquareState.BlackBishop, true, TestName = "Test black bishop")]
    public void HasBlackFigureTest(SquareState squareState, bool expectedResult)
    {
        Assert.AreEqual(expectedResult, squareState.HasBlackFigure());
    }

    [TestCase(SquareState.EnPassantEmpty, false, TestName = "Test if en passant square can castle")]
    [TestCase(SquareState.WhiteKing, false, TestName = "Test white king without castle move")]
    [TestCase(SquareState.BlackKingCanCastle, true, TestName = "Test black king with castle move")]
    public void FigureCanCastleTest(SquareState squareState, bool expectedResult)
    {
        Assert.AreEqual(expectedResult, squareState.CanCastle());
    }
}