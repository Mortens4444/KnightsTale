using System;

namespace Chess.Rules.Moves;

public class MoveWithTime
{
    public Move Move { get; set; }

    public TimeSpan Time { get; set; }

    public MoveWithTime(Move move, TimeSpan time)
    {
        Move = move;
        Time = time;
    }

    public override string ToString()
    {
        return $"{Move} - {Time}";
    }
}
