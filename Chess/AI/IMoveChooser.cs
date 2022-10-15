using Chess.Rules.Moves;
using Chess.Table;

namespace Chess.AI;

public interface IMoveChooser
{
    MoveDecisionHelper GetMoveDecisionHelper(ChessTable chessTable);
}