using Chess.Rules.Moves;
using Chess.Table.TableSquare;
using System.Diagnostics.Contracts;

namespace Chess.Table
{
    public static class SquareExtensions
    {
        public static MoveType GetMoveType(this Square destination)
        {
            Contract.Requires(destination != null);

            return destination.State.GetMoveType();
        }
    }
}
