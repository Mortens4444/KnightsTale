using System.Collections.Generic;

namespace Chess.Rules.Moves;

public class MoveDecisionHelper
{
    public IList<Move> ValidMoves { get; }

    public IList<MoveWithGainInfo> GoodMovesWithGain { get; }

    public MoveDecisionHelper(IList<Move> validMoves, IList<MoveWithGainInfo> goodMovesWithGain)
    {
        ValidMoves = validMoves;
        GoodMovesWithGain = goodMovesWithGain;
    }
}
