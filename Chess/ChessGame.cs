using Chess.Rules.Moves;
using Chess.Table;
using Chess.Utilities;
using System;
using System.Linq;

[assembly: CLSCompliant(false)]
namespace Chess
{
    public class ChessGame
    {
        public ChessTable ChessTable { get; set; }

        private Logger logger;

        public ChessGame()
        {
            NewGame();
        }

        public void SetLogFile(string value)
        {
            logger = new Logger(value);
        }

        public void NewGame()
        {
            ChessTable = new ChessTable();
        }

        public bool Execute(Move move)
        {
            var validMove = GetValidMove(move);
            if (validMove != null)
            {
                validMove.Execute(ChessTable);
                logger?.Write(validMove);
                ChessTable.TurnControl.ChangeTurn(true);
                return true;
            }
            return false;
        }

        public Move GetValidMove(Move actualMove)
        {
            if (actualMove == null)
            {
                return null;
            }
            ChessTable.TurnControl.ValidateMoveTurn(ChessTable.Squares[actualMove.From]);
            var validMoves = ChessTable.GetValidMoves();
            return validMoves.FirstOrDefault(move => move.Equals(actualMove));
        }

        public bool IsWhiteTurn()
        {
            return ChessTable.TurnControl.IsWhiteTurn();
        }
    }
}
