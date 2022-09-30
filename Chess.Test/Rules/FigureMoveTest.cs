using Chess.Rules.Moves;
using NUnit.Framework;
using System;

namespace Chess.Test.Rules
{
    public class FigureMoveTest
    {
        [TestCase("Chess.Test.Resources.ChessTableState - New Game.cgs", "E2E4", "D7D5", "D2D3", "D5E4", "D3E4", "D8D1", "E1D1", "C8E6", "F2F3", "B8C6", "F1B5", "E8C8", "C1D2", "G8F6", "B5C6", "B7C6", "B1C3", "G7G6", "D1E2", "A7A5", "A1D1", "A5A4", "B2B4", "A4B3", "A2B3", "H7H5", "B3B4", "E6C4", "E2E1", "E7E6", "D2G5", "D8D1", "C3D1", "F8B4", "C2C3", "B4A5", "G1E2", "H8D8", "G5F6", "C4E2", "F6D8", "E2D1", "E1D1", "C8D8", "D1C2", "C6C5", "H1D1", "D8E7", "H2H4", "F7F5", "E4F5", "G6F5", "G2G4", "H5G4", "F3G4", "F5G4", "H4H5", "G4G3", "H5H6", "G3G2", "H6H7", "G2G1", "D1G1", "A5C3", "C2C3", "E7F8", "H7H8", "F8E7", "H8E5", "C7C6", "G1G7", "E7E8", "E5B8")]
        [TestCase("Chess.Test.Resources.ChessTableState - Castling.cgs", "E1E2", "E8E7", "E2E1", "E7E6")]
        public void MoveTest(string chessTableResourceName, params string[] moves)
        {
            var chessGame = new ChessGame
            {
                ChessTable = ResourceLoader.GetChessTable(chessTableResourceName)
            };

            foreach (var move in moves)
            {
                if (!chessGame.Execute(move))
                {
                    Assert.Fail($"No valid move exists: {move}");
                }
            }
            Assert.Pass();
        }

        [TestCase("Chess.Test.Resources.ChessTableState - Castling.cgs", "E1E2", "E8E7", "E2E1", "E7E6", "E1C1")]
        public void MoveTestWithLastMoveFail(string chessTableResourceName, params string[] moves)
        {
            var chessGame = new ChessGame
            {
                ChessTable = ResourceLoader.GetChessTable(chessTableResourceName)
            };

            GetValidMove(moves, chessGame);
            var move = moves[^1];
            var validMove = chessGame.GetValidMove(move);
            Assert.IsNull(validMove);
        }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", "E8E7")]
        public void MoveTestWithException(string chessTableResourceName, params string[] moves)
        {
            var chessGame = new ChessGame
            {
                ChessTable = ResourceLoader.GetChessTable(chessTableResourceName)
            };

            var validMove = GetValidMove(moves, chessGame);
            var move = moves[^1];
            Assert.Throws<InvalidOperationException>(() => { validMove = chessGame.GetValidMove(move); });
        }

        [TestCase("Chess.Test.Resources.ChessTableState.cgs", false)]
        [TestCase("Chess.Test.Resources.ChessTableState - Check.cgs", true)]
        public void CheckTest(string chessTableResourceName, bool expected)
        {
            var chessTable = ResourceLoader.GetChessTable(chessTableResourceName);
            var whiteKingSquare = chessTable.Squares.GetWhiteKingSquare();
            var isInCheck = whiteKingSquare.IsInCheck(chessTable);
            Assert.AreEqual(expected, isInCheck);
        }

        private static Move? GetValidMove(string[] moves, ChessGame chessGame)
        {
            Move? validMove = null;
            for (int i = 0; i < moves.Length - 1; i++)
            {
                if (!chessGame.Execute(moves[i]))
                {
                    Assert.Fail();
                }
            }

            return validMove;
        }
    }
}
