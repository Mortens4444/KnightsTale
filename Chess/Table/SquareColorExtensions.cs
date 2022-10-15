using System;
using System.Drawing;

namespace Chess.Table;

public static class SquareColorExtensions
{
    public static ConsoleColor ToConsoleColor(this SquareColor squareColor)
    {
        switch (squareColor)
        {
            case SquareColor.White:
                return ConsoleColor.White;
            case SquareColor.Black:
                return ConsoleColor.Black;
            default:
                throw new NotImplementedException();
        };
    }

    public static Color ToColor(this SquareColor squareColor)
    {
        switch (squareColor)
        {
            case SquareColor.White:
                return Color.White;
            case SquareColor.Black:
                return Color.Black;
            default:
                throw new NotImplementedException();
        }
    }
}
