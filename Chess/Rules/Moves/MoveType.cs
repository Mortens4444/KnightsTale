using System;

namespace Chess.Rules.Moves
{
    [Flags]
    public enum MoveType
    {
        Unknown = 0x00,
        Relocation = 0x01,
        Hit = 0x02,
        EnPassant = 0x04,
        Castle = 0x08,
        Promotion = 0x10,
        Check = 0x20,
        CheckMate = 0x40
    }
}
