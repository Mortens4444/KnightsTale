namespace Chess.WebApi.Dtos;

public class MoveResult
{
    public string Move { get; }

    public bool IsWhiteTurn { get; }

    public MoveResult(string move, bool isWhiteTurn)
    {
        Move = move;
        IsWhiteTurn = isWhiteTurn;
    }
}
