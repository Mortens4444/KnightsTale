using System;

namespace Chess.Table;

[AttributeUsage(AttributeTargets.Field)]
public sealed class SquareInfoAttribute : Attribute
{
    public char DisplayChar { get; }

    public char NotationChar { get; }

    public char StoreChar { get; }

    public SquareInfoAttribute(char displayChar, char notationChar, byte storeChar)
    {
        DisplayChar = displayChar;
        NotationChar = notationChar;
        StoreChar = (char)storeChar;
    }
}
