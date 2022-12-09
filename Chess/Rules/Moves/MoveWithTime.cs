using Chess.Table;
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

    public MoveWithTime(string moveWithTime, ChessTable chessTable)
    {
        var parts = moveWithTime.Split(new string[] { " - " }, StringSplitOptions.RemoveEmptyEntries);
        Move = new Move(String.Concat(parts[0], parts[1]), chessTable);
        TimeSpan.TryParse(parts[2], out TimeSpan timeSpan);
        Time = timeSpan;
    }

    public override string ToString()
    {
        return $"{Move} - {Time}";
    }
}
