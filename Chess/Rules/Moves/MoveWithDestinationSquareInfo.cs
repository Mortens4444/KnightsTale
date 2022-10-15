using Chess.Table.TableSquare;

namespace Chess.Rules.Moves;

public class MoveWithDestinationSquareInfo
{
    public Move ValidMove { get; set; }

    public Square To { get; set; }

    public override string ToString()
    {
        return $"{ValidMove} - {To.State}";
    }
}
