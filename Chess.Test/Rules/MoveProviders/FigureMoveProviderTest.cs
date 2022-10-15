using Chess.Rules.MoveProviders;
using Chess.Rules.Moves;
using NUnit.Framework;
using System.Linq;

namespace Chess.Test.Rules.MoveProviders;

public abstract class FigureMoveProviderTest
{
    protected abstract FigureMoveProvider FigureMoveProvider { get; }

    public void GetAllMoves(string chessTableResourceName, string from, params string[] allMoveDestinations)
    {
        var chessTable = ResourceLoader.GetChessTable(chessTableResourceName);
        var allMoves = FigureMoveProvider.GetAllMoves(chessTable, from);
        var expected = allMoveDestinations.Select(validMoveDestination => new Move(from, validMoveDestination));
        CollectionAssert.AreEquivalent(expected, allMoves);
        Assert.Pass();
    }

    public void GetValidMoves(string chessTableResourceName, string from, params string[] validMoveDestinations)
    {
        var chessTable = ResourceLoader.GetChessTable(chessTableResourceName);
        var validMoves = FigureMoveProvider.GetValidMoves(chessTable, from, true);
        var expected = validMoveDestinations.Select(validMoveDestination => new Move(from, validMoveDestination));
        CollectionAssert.AreEquivalent(expected, validMoves);
        Assert.Pass();
    }
}
