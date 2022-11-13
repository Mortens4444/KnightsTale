using Chess.AI;
using Chess.FigureValues;
using NUnit.Framework;
using System;

namespace Chess.Test.AI;

public class ArtificalIntelligenceMovesTest
{
    [TestCase("Chess.Test.Resources.ChessTableState - Checkmate.cgs", typeof(Lvl4_NoMoreMoronMoves), "C3 - B2")]
    [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze.cgs", typeof(Lvl1_KamikazeMoves), "E4 - D5")]
    [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze 2.cgs", typeof(Lvl1_KamikazeMoves), "C5 - D5")]
    [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze 2.cgs", typeof(Lvl2_CarefulKamikazeMoves), "E4 - D5")]
    [TestCase("Chess.Test.Resources.ChessTableState - NoMoronMoves.cgs", typeof(Lvl3_NoMoreMoronMoves), "F1 - B1")]
    [TestCase("Chess.Test.Resources.ChessTableState - NoMoronMoves 2.cgs", typeof(Lvl4_NoMoreMoronMoves), "F1 - B1", "F1 - D1", "F1 - G1", "F1 - H1", "F1 - F5")]
    [TestCase("Chess.Test.Resources.ChessTableState - BestMoveForBlack.cgs", typeof(Lvl4_NoMoreMoronMoves), "D7 - C5")]
    [TestCase("Chess.Test.Resources.ChessTableState - BestMoveForBlack 2.cgs", typeof(Lvl4_NoMoreMoronMoves), "B3 - A3")]
    [TestCase("Chess.Test.Resources.ChessTableState - Reveal Check.cgs", typeof(Lvl4_NoMoreMoronMoves), "H5 - E8")]
    [TestCase("Chess.Test.Resources.ChessTableState - Fix Exception.cgs", typeof(Lvl4_NoMoreMoronMoves), "A2 - A3", "A2 - A4", "B2 - B3", "B2 - B4", "C2 - C3", "C2 - C4", "D2 - D3", "D2 - D4", "F2 - F3", "F2 - F4", "G2 - G3", "G2 - G4", "H2 - H3", "H2 - H4", "B1 - A3", "B1 - C3", "G1 - F3", "G1 - H3", "G1 - E2", "D1 - E2", "D1 - F3", "D1 - G4", "D1 - H5", "F1 - E2", "F1 - D3", "F1 - C4", "F1 - B5", "F1 - A6", "E1 - E2")]
    public void MoveChooseTest(string chessTableResourceName, Type artificalIntelligenceType, params string[] expectedChoosenMoves)
    {
        var chessTable = ResourceLoader.GetChessTable(chessTableResourceName);
        var artificalIntelligence = Activator.CreateInstance(artificalIntelligenceType, FigureValueCalculationMode.General) as IArtificalIntelligence;
        var move = artificalIntelligence!.GetMove(chessTable);

        if (expectedChoosenMoves.Length == 1)
        {
            Assert.AreEqual(expectedChoosenMoves[0], move!.ToString());
        }
        else
        {
            Assert.Contains(move!.ToString(), expectedChoosenMoves);
        }

        move.Execute(chessTable, false, false);
        Assert.IsFalse(chessTable.IsInCheck(chessTable.Squares.GetWhiteKingSquare()));
    }
}
