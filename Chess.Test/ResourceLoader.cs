using Chess.Table;
using System;
using System.IO;
using System.Reflection;

[assembly: CLSCompliant(false)]
namespace Chess.Test;

internal class ResourceLoader
{
    public static ChessTable GetChessTable(string resourceName)
    {
        var content = GetContent(resourceName);
        var chessTable = new ChessTable();
        chessTable.LoadByteArray(content);
        return chessTable;
    }

    private static byte[] GetContent(string resourceName)
    {
        var assembly = Assembly.GetCallingAssembly();
        var stream = assembly.GetManifestResourceStream(resourceName);
        if (stream != null)
        {
            using var memoryStream = new MemoryStream();
            stream.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }

        throw new FileNotFoundException("Resource file not found.", resourceName);
    }
}
