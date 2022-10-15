namespace Chess.Rules.Moves;

public class MoveWithGainInfo
{
    public Move Move { get; set; }

    public double Gain { get; set; }

    public MoveWithGainInfo(Move move, double gain)
    {
        Move = move;
        Gain = gain;
    }

    public override string ToString()
    {
        return $"{Move} - {Gain}";
    }
}
