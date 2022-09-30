using Chess.Rules.CheckTesters;
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
        
        private static readonly List<ICheckTester> checkTesters = new List<ICheckTester>
        {
            new RookCheckTester(), new BishopCheckTester(), new KnightCheckTester(), new PawnCheckTester()
        };

        public IList<Move> GetValidMoves(ChessTable chessTable, SquareBase from)
        {
            var result = GetAllMoves(chessTable, from);
            RemoveCheckMoves(chessTable, from, result);
            return result;
        }

        protected static void AddMove(Square from, Square destination, IList<Move> result)
        {
            Contract.Requires(from != null && destination != null && result != null);

            if (from.State.HasFigure())
            {
                AddHitMove(from, destination, result);
            }
            else if (destination.State.IsEmpty())
            {
                result.Add(new Move(from, destination, MoveType.Relocation));
            }
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

            result.Add(new Move(from, to, to.State.GetMoveType()));
        }

        public static void RemoveCheckMoves(ChessTable chessTable, SquareBase from, IList<Move> allMoves)
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

                if (!OppositionTester.IsOpposition(kingSquare, foeKingSquare, invalidMoves, move))
                {
                    foreach (var checkTester in checkTesters)
                    {
                        if (checkTester.IsCheck(chessTable, kingSquare, invalidMoves, move))
                        {
                            break;
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
