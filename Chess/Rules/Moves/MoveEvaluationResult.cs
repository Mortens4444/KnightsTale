namespace Chess.Rules.Moves
{
    public enum MoveEvaluationResult
    {
        Unknown,
        Questionable,
        Bad,
        Neutral,
        Good,
        WinInTwoMoves,
        Winner
    }
}
