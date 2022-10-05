using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

namespace Chess.Rules.MoveProviders
{
    public abstract class FigureMoveProvider
    {
        public abstract IList<Move> GetAllMoves(ChessTable chessTable, SquareBase from);

        public IList<Move> GetValidMoves(ChessTable chessTable, SquareBase from, bool setCheckProperties)
        {
            var result = GetAllMoves(chessTable, from);
            RemoveCheckMoves(chessTable, from, result, setCheckProperties);
            return result;
        }

        protected static void AddValidMove(Square from, Square destination, IList<Move> result)
        {
            Contract.Requires(from != null && destination != null && result != null);

            if (from.State.HasEnemyOnSquare(destination))
            {
                AddHitMove(from, destination, result);
            }
            else if (destination.State.IsEmpty())
            {
                result.Add(new Move(from, destination, MoveType.Relocation));
            }
        }

        protected static void AddHitMove(SquareBase from, Square to, IList<Move> result)
        {
            Contract.Requires(from != null && to != null && result != null);
            var moveType = to.GetMoveType();
            result.Add(new Move(from, to, moveType));
        }

        public static void RemoveCheckMoves(ChessTable chessTable, SquareBase from, IList<Move> allMoves, bool setCheckProperties)
        {
            Contract.Requires(chessTable != null && from != null && allMoves != null);

            var white = chessTable.Squares[from].State.HasWhiteFigure();
            var enPassantSquare = chessTable.Squares.GetEnPassantEmptySquare();

            Square kingSquare;
            Square foeKingSquare;

            if (white)
            {
                kingSquare = chessTable.Squares.GetWhiteKingSquare();
                foeKingSquare = chessTable.Squares.GetBlackKingSquare();
            }
            else
            {
                kingSquare = chessTable.Squares.GetBlackKingSquare();
                foeKingSquare = chessTable.Squares.GetWhiteKingSquare();
            }
            var invalidMoves = new List<Move>();
            var kingMoves = allMoves.Any() && kingSquare == allMoves[0].From;
            Move lastMove = null;
            foreach (var move in allMoves)
            {
                lastMove?.Rollback(chessTable);
                lastMove = move;
                move.Execute(chessTable);

                if (kingMoves)
                {
                    kingSquare = chessTable.Squares[move.To];
                }

                if (chessTable.IsInCheck(kingSquare) || OppositionTester.IsOpposition(kingSquare, foeKingSquare, move))
                {
                    invalidMoves.Add(move);
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
            }
            lastMove?.Rollback(chessTable);
            RestoreEnPassantEmptySquare(chessTable, enPassantSquare);
            allMoves.RemoveAll(move => invalidMoves.Contains(move));
        }

        private static void RestoreEnPassantEmptySquare(ChessTable chessTable, Square enPassantSquare)
        {
            if (enPassantSquare != null)
            {
                chessTable.Squares[enPassantSquare].State = SquareState.EnPassantEmpty;
            }
        }
    }
}
