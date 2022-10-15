namespace Chess.Table;

public enum SquareState
{
    [SquareInfo(' ', ' ', 0x00)]
    Empty = 0x00,                        // 00000000

    [SquareInfo(' ', ' ', 0x20)]
    EnPassantEmpty = 0x20,               // 00100000

    //Starter = 0x01,                      // 00000001
    //EnPassant = 0x20,                    // 00100000
    //CanCastle = 0x40,                    // 01000000
    //BlackFigure = 0x80,                  // 10000000

    [SquareInfo('♙', 'p', 0x01)]
    WhitePawn = 0x01,                    // 00000001
    [SquareInfo('♙', 'p', 0x21)]
    WhitePawnCanHitWithEnPassant = 0x21, // 00100001
    [SquareInfo('♘', 'n', 0x02)]
    WhiteKnight = 0x02,                  // 00000010
    [SquareInfo('♗', 'b', 0x04)]
    WhiteBishop = 0x04,                  // 00000100
    [SquareInfo('♖', 'r', 0x08)]
    WhiteRook = 0x08,                    // 00001000
    [SquareInfo('♖', 'r', 0x48)]
    WhiteRookCanCastle = 0x48,           // 01001000
    [SquareInfo('♕', 'q', 0x0C)]
    WhiteQueen = 0x04 | 0x08,            // 00001100
    [SquareInfo('♔', 'k', 0x10)]
    WhiteKing = 0x10,                    // 00010000
    [SquareInfo('♔', 'k', 0x50)]
    WhiteKingCanCastle = 0x50,           // 01010000
    [SquareInfo('♔', 'k', 0x11)]
    WhiteKingMyTurn = 0x11,              // 00010001
    [SquareInfo('♔', 'k', 0x51)]
    WhiteKingCanCastleMyTurn = 0x51,     // 01010001

    [SquareInfo('♟', 'P', 0x81)]
    BlackPawn = 0x81,                    // 10000001
    [SquareInfo('♟', 'P', 0xA1)]
    BlackPawnCanHitWithEnPassant = 0xA1, // 10100001
    [SquareInfo('♞', 'N', 0x82)]
    BlackKnight = 0x82,                  // 10000010
    [SquareInfo('♝', 'B', 0x84)]
    BlackBishop = 0x84,                  // 10000100
    [SquareInfo('♜', 'R', 0x88)]
    BlackRook = 0x88,                    // 10001000
    [SquareInfo('♜', 'R', 0xC8)]
    BlackRookCanCastle = 0xC8,           // 11001000
    [SquareInfo('♛', 'Q', 0x8C)]
    BlackQueen = 0x8C,                   // 10001100
    [SquareInfo('♚', 'K', 0x90)]
    BlackKing = 0x90,                    // 10010000
    [SquareInfo('♚', 'K', 0xD0)]
    BlackKingCanCastle = 0xD0,           // 11010000
    [SquareInfo('♚', 'K', 0x91)]
    BlackKingMyTurn = 0x91,              // 10010001
    [SquareInfo('♚', 'K', 0xD1)]
    BlackKingCanCastleMyTurn = 0xD1      // 11010001
}
