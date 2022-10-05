using Chess.Rules.Moves;
using Chess.Table.TableSquare;
using System;

namespace Chess.Rules
{
    public static class OppositionTester
    {
        public static bool IsOpposition(Square kingSquare, Square foeKingSquare, Move move)
        {
            if (kingSquare == null || foeKingSquare == null)
            {
                return false;
            }

            if (Math.Abs(foeKingSquare.Rank - kingSquare.Rank) < 2 &&
                Math.Abs(foeKingSquare.Column - kingSquare.Column) < 2)
            {
                return true;
            }

            return false;
        }
    }
}
