using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;

namespace Chess.Rules.CheckTesters
{
    public interface ICheckTester
    {
        bool IsCheck(ChessTable chessTable, Square kingSquare, IList<Move> invalidMoves, Move move);
    }
}