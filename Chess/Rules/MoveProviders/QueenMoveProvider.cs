using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;

namespace Chess.Rules.MoveProviders
{
    public class QueenMoveProvider : FigureMoveProvider
    {
        private readonly BishopMoveProvider bishopMoveProvider = new BishopMoveProvider();
        private readonly RookMoveProvider rookMoveProvider = new RookMoveProvider();

        public override IList<Move> GetAllMoves(ChessTable chessTable, SquareBase from)
        {
            var result = new List<Move>();
            var result1 = bishopMoveProvider.GetAllMoves(chessTable, from);
            var result2 = rookMoveProvider.GetAllMoves(chessTable, from);
            result.AddRange(result1);
            result.AddRange(result2);
            return result;
        }
    }
}
