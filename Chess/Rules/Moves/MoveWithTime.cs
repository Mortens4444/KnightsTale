using Chess.Table;
using System;
using System.Globalization;

namespace Chess.Rules.Moves;

public class MoveWithTime
{
    public Move Move { get; set; }

    public TimeSpan Time { get; set; }

    private static readonly string[] Separator = new string[] { " - " };

    public MoveWithTime(Move move, TimeSpan time)
    {
        Move = move;
        Time = time;
    }

    public MoveWithTime(string moveWithTime, ChessTable chessTable)
    {
        ArgumentNullException.ThrowIfNull(moveWithTime);

        var parts = moveWithTime.Split(Separator, StringSplitOptions.RemoveEmptyEntries);
        Move = new Move(String.Concat(parts[0], parts[1]), chessTable);
        if (TimeSpan.TryParse(parts[2], CultureInfo.InvariantCulture, out TimeSpan timeSpan))
        {
            Time = timeSpan;
        }
    }

    public override string ToString()
    {
        return $"{Move} - {Time}";
    }
}
