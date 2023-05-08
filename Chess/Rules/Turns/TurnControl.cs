using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;

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

        public void SendTurnNotification()
        {
            SetTurn(chessTable.LastMove.Move, true, white);
        }

        public void ChangeTurn(Move lastMove, bool sendTurnChangedEvent)
        {
            white = !white;
            SetTurn(lastMove, sendTurnChangedEvent, white);
        }

        private void SetTurn(Move lastMove, bool sendTurnChangedEvent, bool isWhite)
        {
            var kingSquares = chessTable.Squares.GetKingSquares(!isWhite);
            white = isWhite;
            ChangeTurn(kingSquares);
            if (sendTurnChangedEvent)
            {
                OnChangeTurn(lastMove, isWhite);
            }
        }

        private void ChangeTurn(IList<Square> kingSquares)
        {
            var kingSquarePreviousTurn = kingSquares[0];
            var kingSquareNewTurn = kingSquares[1];
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
            chessTable.FinalizeSquares();
            TurnChanged?.Invoke(this, new TurnControlEventArgs(lastMove, isWhiteTurn));
        }
    }
}
