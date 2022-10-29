using Chess;
using Chess.Table;
using System.Text;

namespace Chess.WebApi.Dto;

public class KnightsTaleDto
{
    public string States { get; set; } = String.Empty;
    
    public byte[] StateValues { get; set; } = new byte[64];

    public static KnightsTaleDto CreateFromGame(ChessGame chessGame)
    {
        var stringBuilder = new StringBuilder();
        foreach (var square in chessGame.ChessTable.Squares)
        {
            var squareInfo = square.State.GetSquareInfo();
            stringBuilder.Append(squareInfo.DisplayChar);
        }
        return new KnightsTaleDto
        {
            States = stringBuilder.ToString(),
            StateValues = chessGame.ChessTable.GetSquareStates()
        };
    }
}