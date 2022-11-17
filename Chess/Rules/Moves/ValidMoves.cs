using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Linq;

namespace Chess.Rules.Moves
{
    public class ValidMoves : List<Move>
    {
        public bool AddValidMoveOnly(Move move, ChessTable chessTable, bool setCheckProperties, IOrderedEnumerable<Square> kings)
        {
            var result = false;
            var kingSquare = kings.ElementAt(0);
            var foeKingSquare = kings.ElementAt(1);

            if (move.MoveType != MoveType.Castle || !chessTable.IsInCheck(kingSquare))
            {
                move.Execute(chessTable, false, false);

                if (move.From.Equals(kingSquare))
                {
                    kingSquare = move.To;
                }

                if (!chessTable.IsInCheck(kingSquare) && !OppositionTester.IsOpposition(kingSquare, foeKingSquare, move))
                {
                    if (move.MoveType == MoveType.CheckMate)
                    {
                        move.IsEnemyInCheckMate = true;
                    }
                    else
                    {
                        if (setCheckProperties && chessTable.IsInCheck(foeKingSquare))
                        {
                            if (chessTable.HasValidMove(foeKingSquare.State))
                            {
                                move.IsEnemyInCheck = true;
                            }
                            else
                            {
                                move.IsEnemyInCheckMate = true;
                            }
                        }
                    }
                    Add(move);
                    result = true;
                }

                move.Rollback(chessTable, false, false);
            }
            return result;
        }

        public static ValidMoves GetValidMovesFromPossibleMoves(ChessTable chessTable, Square from, PossibleMoves allMoves, bool setCheckProperties, bool stopSearchOnFirstValidMove)
        {
            var result = new ValidMoves();

            if (!allMoves.Any())
            {
                return result;
            }

            var enPassantSquare = chessTable.Squares.GetEnPassantEmptySquare();
            var kings = chessTable.Squares.GetKingSquares(from.State.HasWhiteFigure());

            foreach (var move in allMoves)
            {
                var hasValidMove = result.AddValidMoveOnly(move, chessTable, setCheckProperties, kings);
                RestoreEnPassantEmptySquare(enPassantSquare);
                if (hasValidMove &&  stopSearchOnFirstValidMove)
                {
                    break;
                }
            }

            return result;
        }

        private static void RestoreEnPassantEmptySquare(Square enPassantSquare)
        {
            if (enPassantSquare != null)
            {
                enPassantSquare.State = SquareState.EnPassantEmpty;
            }
        }
    }
}
