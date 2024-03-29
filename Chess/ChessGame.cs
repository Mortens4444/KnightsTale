﻿using Chess.CustomEventArgs;
using Chess.Rules.Moves;
using Chess.Table;
using Chess.Utilities;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

[assembly: CLSCompliant(false)]
[assembly: InternalsVisibleTo("Chess.Test")]
namespace Chess;

public class ChessGame
{
    public event EventHandler<PawnPromotionEventArgs> PawnPromotionEvent;

    public ChessTable ChessTable { get; internal set; } = new ChessTable();

    private Logger logger;

    public ChessGame()
    {
        NewGame();
    }

    public void SetLogFile(string value)
    {
        logger = new Logger(value);
    }

    public void NewGame()
    {
        ChessTable.SetupTable();
    }

    public bool Execute(string move)
    {
        return Execute(new Move(move, ChessTable));
    }

    public bool Execute(Move move)
    {
        var validMove = GetValidMove(move);
        if (validMove != null)
        {
            validMove.Execute(ChessTable, true, true, PawnPromotionEvent != null);
            if (validMove.MoveType == MoveType.Promotion || validMove.MoveType == MoveType.HitWithPromotion)
            {
                RaisePawnPromotionEvent(validMove);
            }
            logger?.Write(validMove);
            return true;
        }
        return false;
    }

    public Move GetValidMove(string actualMove)
    {
        return GetValidMove(new Move(actualMove, ChessTable));
    }

    public Move GetValidMove(Move actualMove)
    {
        if (actualMove == null)
        {
            return null;
        }
        ChessTable.TurnControl.ValidateMoveTurn(actualMove.From);
        var validMoves = ChessTable.GetValidMoves();
        return validMoves.FirstOrDefault(move => move.Equals(actualMove));
    }

    public bool IsWhiteTurn()
    {
        return ChessTable.TurnControl.IsWhiteTurn();
    }

    protected virtual void RaisePawnPromotionEvent(Move move)
    {
        PawnPromotionEvent?.Invoke(this, new PawnPromotionEventArgs(move));
    }
}
