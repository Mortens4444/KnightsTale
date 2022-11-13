using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using Chess.FigureValues;
using Chess.Table.TableSquare;

namespace Chess.Table;

public class SquareList : List<Square>
{
    public Square this[string squareName]
    {
        get
        {
            foreach (var square in this.Where(square => square.Name == squareName))
            {
                return square;
            }

            throw new ArgumentOutOfRangeException($"Square not found: {squareName}");
        }
    }

    public Square this[Square squareBase]
    {
        get
        {
            Contract.Requires(squareBase != null);

            foreach (var square in this.Where(square => (square.Column == squareBase.Column) && (square.Rank == squareBase.Rank)))
            {
                return square;
            }

            throw new ArgumentOutOfRangeException($"Square not found with column and rank: {squareBase.Column}, {squareBase.Rank}");
        }
    }

    public Square this[Column column, Rank rank]
    {
        get
        {
            foreach (var square in this.Where(square => (square.Column == column) && (square.Rank == rank)))
            {
                return square;
            }

            throw new ArgumentOutOfRangeException($"Square not found with column and rank: {column}, {rank}");
        }
    }

    public Square GetWhiteKingSquare()
    {
        return this.Single(square => square.State.HasKing() && square.State.HasWhiteFigure());
    }

    public Square GetBlackKingSquare()
    {
        return this.Single(square => square.State.HasKing() && square.State.HasBlackFigure());
    }

    public Square GetEnPassantEmptySquare()
    {
        return this.FirstOrDefault(square => square.State == SquareState.EnPassantEmpty);
    }

    public IEnumerable<Square> GetAll(SquareState squareState)
    {
        return this.Where(square => square.State == squareState);
    }

    public IEnumerable<Square> GetAllWhiteFigureSquares()
    {
        return this.Where(square => square.State >= SquareState.WhitePawn && square.State <= (SquareState.WhiteKingCanCastleMyTurn));
    }

    public IEnumerable<Square> GetAllBlackFigureSquares()
    {
        return this.Where(square => square.State >= SquareState.BlackPawn && square.State <= (SquareState.BlackKingCanCastleMyTurn));
    }

    public double GetWhiteFiguresValue(FigureValueCalculationMode figureValueCalculationMode)
    {
        return GetFiguresValue(figureValueCalculationMode, GetAllWhiteFigureSquares);
    }

    public double GetBlackFiguresValue(FigureValueCalculationMode figureValueCalculationMode)
    {
        return GetFiguresValue(figureValueCalculationMode, GetAllBlackFigureSquares);
    }

    public static double GetFiguresValue(FigureValueCalculationMode figureValueCalculationMode, Func<IEnumerable<Square>> figureProvider)
    {
        Contract.Requires(figureProvider != null);

        var figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        var figureSquares = figureProvider();
        return figureSquares.Sum(figureSquare => figureValueCalculator.GetValue(figureSquare.State) ?? 0);
    }
}