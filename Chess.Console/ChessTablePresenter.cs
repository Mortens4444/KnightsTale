using Chess.Table;
using System.Text;

[assembly: CLSCompliant(false)]
namespace Chess.Console;

public class ChessTablePresenter
{
    private const string Columns = "   ABCDEFGH";

    static ChessTablePresenter()
    {
        System.Console.OutputEncoding = Encoding.UTF8;
    }

    public static void ShowState(ChessTable chessTable)
    {
        WriteTableInfo(Columns);
        for (int i = 0; i < chessTable.Squares.Count; i++)
        {
            if (i % 8 == 0)
            {
                WriteTableInfo($" {8 - i / 8} ", false);
            }
            var square = chessTable.Squares[i];
            System.Console.ForegroundColor = square.State.HasWhiteFigure() ? ConsoleColor.Green : ConsoleColor.Blue;
            System.Console.BackgroundColor = square.Color.ToConsoleColor();
            var info = square.State.GetSquareInfo();
            System.Console.Write(info.DisplayChar);

            if (i % 8 == 7)
            {
                WriteTableInfo($" {8 - i / 8}");
            }
        }
        WriteTableInfo(Columns);
    }

    private static void WriteTableInfo(string info, bool writeLine = true)
    {
        System.Console.BackgroundColor = ConsoleColor.Black;
        System.Console.ForegroundColor = ConsoleColor.White;
        if (writeLine)
        {
            System.Console.WriteLine(info);
        }
        else
        {
            System.Console.Write(info);
        }
    }
}
