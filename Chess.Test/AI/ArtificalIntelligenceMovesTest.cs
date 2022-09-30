﻿using Chess.AI;
using Chess.FigureValues;
using NUnit.Framework;
using System;
using System.Linq;

namespace Chess.Test.AI
{
    public class ArtificalIntelligenceMovesTest
    {
        [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze.cgs", typeof(Lvl1_KamikazeMoves), "E4 - D5")]
        [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze 2.cgs", typeof(Lvl1_KamikazeMoves), "C5 - D5")]
        [TestCase("Chess.Test.Resources.ChessTableState - Kamikaze 2.cgs", typeof(Lvl2_CarefulKamikazeMoves), "E4 - D5")]
        [TestCase("Chess.Test.Resources.ChessTableState - NoMoronMoves.cgs", typeof(Lvl3_NoMoreMoronMoves), "F1 - B1")]
        [TestCase("Chess.Test.Resources.ChessTableState - NoMoronMoves 2.cgs", typeof(Lvl4_NoMoreMoronMoves), "F1 - B1", "F1 - D1", "F1 - G1", "F1 - H1", "F1 - F5")]
        [TestCase("Chess.Test.Resources.ChessTableState - BestMoveForBlack.cgs", typeof(Lvl4_NoMoreMoronMoves), "D7 - C5")]
        [TestCase("Chess.Test.Resources.ChessTableState - BestMoveForBlack 2.cgs", typeof(Lvl4_NoMoreMoronMoves), "B3 - A3")]
        public void MoveChooseTest(string chessTableResourceName, Type artificalIntelligenceType, params string[] expectedChoosenMoves)
        {
            var chessTable = ResourceLoader.GetChessTable(chessTableResourceName);
            var artificalIntelligence = Activator.CreateInstance(artificalIntelligenceType, FigureValueCalculationMode.General) as IArtificalIntelligence;
            var move = artificalIntelligence?.GetMove(chessTable);

            if (expectedChoosenMoves.Length == 1)
            {
                Assert.AreEqual(expectedChoosenMoves[0], move?.ToString());
            }
            else
            {
                Assert.IsTrue(expectedChoosenMoves.Any(expectedChoosenMove => expectedChoosenMove == move?.ToString()));
            }
        }
    }
}