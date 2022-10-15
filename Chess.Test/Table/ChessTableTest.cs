using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using NUnit.Framework;

namespace Chess.Test.Table;

public class ChessTableTest
{
    [Test]
    public void ChessTableTestInit()
    {
        var chessTable = new ChessTable();

        var columns = Utils.GetEnumValues<Column>();
        foreach (var column in columns)
        {
            Assert.AreEqual(SquareState.WhitePawn, chessTable.Squares[column, Rank._2].State);
            Assert.AreEqual(SquareState.BlackPawn, chessTable.Squares[column, Rank._7].State);
        }

        Assert.AreEqual(SquareState.WhiteRookCanCastle, chessTable.Squares[Column.A, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKnight, chessTable.Squares[Column.B, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteBishop, chessTable.Squares[Column.C, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteQueen, chessTable.Squares[Column.D, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKingCanCastleMyTurn, chessTable.Squares[Column.E, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteBishop, chessTable.Squares[Column.F, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKnight, chessTable.Squares[Column.G, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteRookCanCastle, chessTable.Squares[Column.H, Rank._1].State);
        Assert.AreEqual(SquareState.BlackRookCanCastle, chessTable.Squares[Column.A, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKnight, chessTable.Squares[Column.B, Rank._8].State);
        Assert.AreEqual(SquareState.BlackBishop, chessTable.Squares[Column.C, Rank._8].State);
        Assert.AreEqual(SquareState.BlackQueen, chessTable.Squares[Column.D, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKingCanCastle, chessTable.Squares[Column.E, Rank._8].State);
        Assert.AreEqual(SquareState.BlackBishop, chessTable.Squares[Column.F, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKnight, chessTable.Squares[Column.G, Rank._8].State);
        Assert.AreEqual(SquareState.BlackRookCanCastle, chessTable.Squares[Column.H, Rank._8].State);
    }

    [Test]
    public void ChessTableTestLoad()
    {
        var chessTable = ResourceLoader.GetChessTable("Chess.Test.Resources.ChessTableState.cgs");

        Assert.AreEqual(SquareState.WhitePawn, chessTable.Squares[Column.D, Rank._3].State);
        Assert.AreEqual(SquareState.BlackPawn, chessTable.Squares[Column.D, Rank._5].State);
        Assert.AreEqual(SquareState.WhitePawn, chessTable.Squares[Column.E, Rank._4].State);
        Assert.AreEqual(SquareState.BlackPawn, chessTable.Squares[Column.E, Rank._5].State);
        Assert.AreEqual(SquareState.WhitePawn, chessTable.Squares[Column.F, Rank._4].State);
        Assert.AreEqual(SquareState.BlackPawn, chessTable.Squares[Column.F, Rank._6].State);
        Assert.AreEqual(SquareState.BlackBishop, chessTable.Squares[Column.G, Rank._4].State);

        Assert.AreEqual(SquareState.WhiteRookCanCastle, chessTable.Squares[Column.A, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKnight, chessTable.Squares[Column.B, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteBishop, chessTable.Squares[Column.C, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteQueen, chessTable.Squares[Column.D, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKingCanCastleMyTurn, chessTable.Squares[Column.E, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteBishop, chessTable.Squares[Column.F, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteKnight, chessTable.Squares[Column.G, Rank._1].State);
        Assert.AreEqual(SquareState.WhiteRookCanCastle, chessTable.Squares[Column.H, Rank._1].State);

        Assert.AreEqual(SquareState.BlackRookCanCastle, chessTable.Squares[Column.A, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKnight, chessTable.Squares[Column.B, Rank._8].State);
        Assert.AreEqual(SquareState.BlackQueen, chessTable.Squares[Column.D, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKingCanCastle, chessTable.Squares[Column.E, Rank._8].State);
        Assert.AreEqual(SquareState.BlackBishop, chessTable.Squares[Column.F, Rank._8].State);
        Assert.AreEqual(SquareState.BlackKnight, chessTable.Squares[Column.G, Rank._8].State);
        Assert.AreEqual(SquareState.BlackRookCanCastle, chessTable.Squares[Column.H, Rank._8].State);
    }
}