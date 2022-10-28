namespace Chess.WebApi.Dto;

public class KnightsTaleDto
{
    public string States { get; set; } = String.Empty;
    
    public byte[] StateValues { get; set; } = new byte[64];
}