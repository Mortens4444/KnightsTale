using Chess.Rules.Moves;
using Chess.Table.TableSquare;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.CheckTesters
{
    public static class OppositionTester
    {
        public static bool IsOpposition(Square kingSquare, Square foeKingSquare, IList<Move> invalidMoves, Move move)
        {
            Contract.Requires(invalidMoves != null);

            if (kingSquare == null || foeKingSquare == null)
            {
                return false;
            }

            if ((Math.Abs(foeKingSquare.Rank - kingSquare.Rank) < 2) &&
                (Math.Abs(foeKingSquare.Column - kingSquare.Column) < 2))
            {
                invalidMoves.Add(move);
                return true;
            }

            return false;
        }
    }
}
