﻿using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Rules.MoveProviders
{
    public class RookMoveProvider : FigureMoveProvider
    {
        public override IList<Move> GetAllMoves(ChessTable chessTable, SquareBase from)
        {
            Contract.Requires(chessTable != null && from != null);

            var result = new List<Move>();

            Square destination = null;
            int modifier = 1;
            Rank rank;
            do
            {
                rank = from.Rank - modifier;
                if (rank >= Rank._1)
                {
                    destination = chessTable.Squares[from.Column, rank];
                    AddValidMove(chessTable.Squares[from], destination, result);
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            destination = null;
            modifier = 1;
            do
            {
                rank = from.Rank + modifier;
                if (rank <= Rank._8)
                {
                    destination = chessTable.Squares[from.Column, rank];
                    AddValidMove(chessTable.Squares[from], destination, result);
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            modifier = 1;
            destination = null;
            Column column;
            do
            {
                column = from.Column - modifier;
                if (column >= Column.A)
                {
                    destination = chessTable.Squares[column, from.Rank];
                    AddValidMove(chessTable.Squares[from], destination, result);
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            modifier = 1;
            destination = null;
            do
            {
                column = from.Column + modifier;
                if (column <= Column.H)
                {
                    destination = chessTable.Squares[column, from.Rank];
                    AddValidMove(chessTable.Squares[from], destination, result);
                    modifier++;
                }
                else
                {
                    break;
                }
            } while (!destination?.State.HasFigure() ?? false);

            return result;
        }
    }
}