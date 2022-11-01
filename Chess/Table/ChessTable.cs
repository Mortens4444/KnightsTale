using Chess.Rules.MoveProviders;
using Chess.Rules.Moves;
using Chess.Rules.Turns;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Contracts;
using System.IO;
using System.Linq;
using System.Text;

namespace Chess.Table;

[DebuggerDisplay("{DebuggerDisplay,nq}")]
public class ChessTable
{
    public SquareList Squares { get; private set; }

    public IList<Column> Columns { get; private set; }

    public IList<Rank> Ranks { get; private set; }

    public TurnControl TurnControl { get; private set; }

    public DebugMode DebugMode { get; set; } = DebugMode.None;

    public Action<string> DebugWriter { get; set; }

    public string DebuggerDisplay { get { return ToString(SquareInfoMode.Display, true); } }

    private readonly ValidMoveProvider validMoveProvider = new ValidMoveProvider();

    public ChessTable()
    {
        Columns = Utils.GetEnumValues<Column>().ToList();
        var ranks = Utils.GetEnumValues<Rank>().ToList();
        ranks.Sort(new ReverseRankSorter());
        Ranks = ranks;
        TurnControl = new TurnControl(this);
        SetupTable();

        DebugWriter = (string message) =>
        {
            if (DebugMode.HasFlag(DebugMode.Debug))
            {
                Debug.WriteLine(message);
            }
            if (DebugMode.HasFlag(DebugMode.Output))
            {
                Console.WriteLine(message);
            }
        };
    }

    public void SetupTable()
    {
        InitializeSquares();

        Squares[Column.A, Rank._1].State = SquareState.WhiteRookCanCastle;
        Squares[Column.B, Rank._1].State = SquareState.WhiteKnight;
        Squares[Column.C, Rank._1].State = SquareState.WhiteBishop;
        Squares[Column.D, Rank._1].State = SquareState.WhiteQueen;
        Squares[Column.E, Rank._1].State = SquareState.WhiteKingCanCastleMyTurn;
        Squares[Column.F, Rank._1].State = SquareState.WhiteBishop;
        Squares[Column.G, Rank._1].State = SquareState.WhiteKnight;
        Squares[Column.H, Rank._1].State = SquareState.WhiteRookCanCastle;

        var columns = Utils.GetEnumValues<Column>().ToList();
        foreach (var column in columns)
        {
            Squares[column, Rank._2].State = SquareState.WhitePawn;
            Squares[column, Rank._7].State = SquareState.BlackPawn;
        }

        Squares[Column.A, Rank._8].State = SquareState.BlackRookCanCastle;
        Squares[Column.B, Rank._8].State = SquareState.BlackKnight;
        Squares[Column.C, Rank._8].State = SquareState.BlackBishop;
        Squares[Column.D, Rank._8].State = SquareState.BlackQueen;
        Squares[Column.E, Rank._8].State = SquareState.BlackKingCanCastle;
        Squares[Column.F, Rank._8].State = SquareState.BlackBishop;
        Squares[Column.G, Rank._8].State = SquareState.BlackKnight;
        Squares[Column.H, Rank._8].State = SquareState.BlackRookCanCastle;

        TurnControl.Reset();
    }

    private void InitializeSquares()
    {
        Squares = new SquareList();
        foreach (var rank in Ranks)
        {
            foreach (var column in Columns)
            {
                Squares.Add(new Square(column, rank));
            }
        }
    }

    public void CopyStates(ChessTable chessTable)
    {
        LoadByteArray(chessTable.GetSquareStates());
    }

    public byte[] GetSquareStates()
    {
        return Squares.Select(square => (byte)square.State).ToArray();
    }

    public void SaveToFile(string filePath)
    {
        File.WriteAllBytes(filePath, GetSquareStates());
    }

    public void LoadFromFile(string filePath)
    {
        var fileContent = File.ReadAllBytes(filePath);
        LoadByteArray(fileContent);
    }
    
    public void LoadByteArray(byte[] fileContent)
    {
        Contract.Requires(fileContent != null);

        for (int i = 0; i < fileContent.Length; i++)
        {
            Squares[i].State = (SquareState)fileContent[i];
        }
    }

    public void ClearEnPassantSquare()
    {
        foreach (var square in Squares.Where(s => s.State == SquareState.EnPassantEmpty))
        {
            square.State = SquareState.Empty;
        }
    }

    public string ToString(SquareInfoMode squareInfoMode, bool showRanksAndColumns)
    {
        var result = new StringBuilder();
        if (showRanksAndColumns)
        {
            result.AppendLine(" ABCDEFGH");
        }
        foreach (var rank in Ranks)
        {
            if (showRanksAndColumns)
            {
                result.Append(RankHelper.ToString(rank));
            }
            foreach (var column in Columns)
            {
                var squareInfo = Squares[column, rank].State.GetSquareInfo();
                switch (squareInfoMode)
                {
                    case SquareInfoMode.Display:
                        result.Append(squareInfo.DisplayChar);
                        break;
                    case SquareInfoMode.Notation:
                        result.Append(squareInfo.NotationChar);
                        break;
                    case SquareInfoMode.Store:
                        result.Append(squareInfo.StoreChar);
                        break;
                    default:
                        throw new NotImplementedException();
                }
                
            }
            result.AppendLine(showRanksAndColumns ? RankHelper.ToString(rank) : String.Empty);
        }
        if (showRanksAndColumns)
        {
            result.AppendLine(" ABCDEFGH");
        }
        return result.ToString();
    }

    public IList<Move> GetValidMoves()
    {
        var figures =
            TurnControl.IsWhiteTurn() ? Squares.GetAllWhiteFigureSquares() :
            TurnControl.IsBlackTurn() ? Squares.GetAllBlackFigureSquares() :
            Enumerable.Empty<Square>();

        return GetValidMoves(figures);
    }

    public IList<Move> GetAllMoves(IEnumerable<Square> figures)
    {
        Contract.Requires(figures != null);

        var result = new List<Move>();
        foreach (var figure in figures)
        {
            result.AddRange(validMoveProvider.GetAllMoves(this, figure));
        }

        return result;
    }

    public bool HasValidMove(SquareState squareState)
    {
        var figures =
            squareState.HasWhiteFigure() ? Squares.GetAllWhiteFigureSquares() :
            squareState.HasBlackFigure() ? Squares.GetAllBlackFigureSquares() :
            throw new InvalidOperationException($"{nameof(squareState)} should contain a figure.");

        foreach (var figure in figures)
        {
            if (validMoveProvider.HasValidMove(this, figure))
            {
                return true;
            }
        }

        return false;
    }

    public IList<Move> GetValidMoves(IEnumerable<Square> figures)
    {
        Contract.Requires(figures != null);

        var result = new List<Move>();
        foreach (var figure in figures)
        {
            result.AddRange(validMoveProvider.GetValidMoves(this, figure, true));
        }

        return result;
    }

    public bool IsEnemyInCheck(SquareBase square)
    {
        var kingSquare = Squares[square].State.HasWhiteFigure() ?
            Squares.GetBlackKingSquare() :
            Squares.GetWhiteKingSquare();
        return IsInCheck(kingSquare);
    }

    public bool IsInCheck(Square kingSquare)
    {
        return kingSquare.IsInCheck(this);
    }
}
