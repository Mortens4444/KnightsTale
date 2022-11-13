using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System;
using System.Diagnostics.Contracts;

namespace Chess.Rules.Turns
{
    public class TurnControl
    {
        private bool white;
        private readonly ChessTable chessTable;

        public event EventHandler<TurnControlEventArgs> TurnChanged;

        public TurnControl(ChessTable chessTable)
        {
            this.chessTable = chessTable;
            Reset();
        }

        public void Reset()
        {
            white = true;
        }

        public bool IsWhiteTurn()
        {
            return chessTable.Squares.GetWhiteKingSquare().State.IsMyTurn();
        }

        public bool IsBlackTurn()
        {
            return chessTable.Squares.GetBlackKingSquare().State.IsMyTurn();
        }

        public void ValidateMoveTurn(Square fromSquare)
        {
            Contract.Requires(fromSquare != null);

            if (fromSquare.State.HasWhiteFigure())
            {
                if (!IsWhiteTurn())
                {
                    throw new InvalidOperationException("It is the black's turn.");
                }
            }
            else if (fromSquare.State.HasBlackFigure())
            {
                if (!IsBlackTurn())
                {
                    throw new InvalidOperationException("It is the white's turn.");
                }
            }
            else
            {
                throw new InvalidOperationException("Invalid move, try like this: e2e4");
            }
        }

        public void ChangeTurn(Move lastMove, bool sendTurnChangedEvent)
        {
            white = !white;
            var whiteKingSquare = chessTable.Squares.GetWhiteKingSquare();
            var blackKingSquare = chessTable.Squares.GetBlackKingSquare();
            if (white)
            {
                ChangeTurn(blackKingSquare, whiteKingSquare);
            }
            else
            {
                ChangeTurn(whiteKingSquare, blackKingSquare);
            }

            if (sendTurnChangedEvent)
            {
                OnChangeTurn(lastMove, white);
            }
        }

        private void ChangeTurn(Square kingSquarePreviousTurn, Square kingSquareNewTurn)
        {
            kingSquarePreviousTurn.State = kingSquarePreviousTurn.State.SetTurn(false);
            kingSquareNewTurn.State = kingSquareNewTurn.State.SetTurn(true);

            if (kingSquareNewTurn.State.HasWhiteFigure())
            {
                chessTable.DebugWriter($"White turn {kingSquareNewTurn.Column}{RankHelper.ToString(kingSquareNewTurn.Rank)}.");
            }
            if (kingSquareNewTurn.State.HasBlackFigure())
            {
                chessTable.DebugWriter($"Black turn {kingSquareNewTurn.Column}{RankHelper.ToString(kingSquareNewTurn.Rank)}.");
            }
        }

        protected virtual void OnChangeTurn(Move lastMove, bool isWhiteTurn)
        {
            TurnChanged?.Invoke(this, new TurnControlEventArgs(lastMove, isWhiteTurn));
        }
    }
}
