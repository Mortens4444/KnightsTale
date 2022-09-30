using Chess.AI;
using Chess.Rules.Moves;
using Chess.Rules.Turns;
using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using Chess.WinForms.Extensions;

namespace Chess.WinForms
{
    public partial class MainForm : Form
    {
        private readonly BoardPainter boardPainter = new();
        private readonly ChessGame chessGame = new();
        private Square? fromSquare = null;
        private IArtificalIntelligence? whiteArtificalIntelligence = null;
        private IArtificalIntelligence? blackArtificalIntelligence = null;

        public MainForm()
        {
            InitializeComponent();

            cbWhite.GetValues(Level.Human);
            cbBlack.GetValues(Level.Human);

            chessGame.ChessTable.TurnControl.TurnChanged += TurnControl_TurnChanged;
        }

        private void PBoard_Paint(object sender, PaintEventArgs e)
        {
            boardPainter.ShowChessBoard(e, chessGame.ChessTable, fromSquare);
        }

        private void TsmiNewGame_Click(object sender, EventArgs e)
        {
            chessGame.ChessTable.SetupTable();
            pBoard.Invalidate();
            lvMoves.Items.Clear();
            rtbMessage.Text = String.Empty;
        }

        private void TsmiLoadGame_Click(object sender, EventArgs e)
        {
            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                chessGame.ChessTable.LoadFromFile(openFileDialog.FileName);
                pBoard.Invalidate();
            }
        }

        private void TsmiSaveGame_Click(object sender, EventArgs e)
        {
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                chessGame.ChessTable.SaveToFile(saveFileDialog.FileName);
                pBoard.Invalidate();
            }
        }

        private void TsmiExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        public static Column GetActualColumn(int horizontal_delta, int x)
        {
            return (x - horizontal_delta) / BoardPainter.SquareWidth + Column.A;
        }

        public static Rank GetActualRank(int vertical_delta, int y)
        {
            return Rank._8 - (y - vertical_delta) / BoardPainter.SquareHeight;
        }

        private void PBoard_MouseClick(object sender, MouseEventArgs e)
        {
            Move? move = null;
            try
            {
                if (fromSquare == null)
                {
                    fromSquare = GetSquare(e);
                }
                else
                {
                    var toSquare = GetSquare(e);
                    if (fromSquare != toSquare)
                    {
                        move = new Move(fromSquare, toSquare);
                        if (chessGame.Execute(move))
                        {
                            AddMoveToListView(move);
                            rtbMessage.Text = String.Empty;
                        }
                        else
                        {
                            rtbMessage.Text = $"The move ({move}) is not valid.";
                        }
                    }

                    fromSquare = null;
                }
                pBoard.Invalidate();
            }
            catch (Exception ex)
            {
                var message = move == null ? ex.Message : $"{ex.Message} You tried: {move}";
                rtbMessage.Text = message;
                fromSquare = null;
            }
        }

        private void AddMoveToListView(Move move)
        {
            var number = lvMoves.Items.Count + 1;
            var item = new ListViewItem(number.ToString())
            {
                BackColor = lvMoves.Items.Count % 2 == 0 ? Color.LightBlue : lvMoves.BackColor
            };
            item.SubItems.Add(move.ToString());
            lvMoves.Items.Add(item);
        }

        private Square GetSquare(MouseEventArgs e)
        {
            var column = GetActualColumn(BoardPainter.Frame, e.X);
            var rank = GetActualRank(BoardPainter.Frame, e.Y);
            return chessGame.ChessTable.Squares[column, rank];
        }

        private void CbWhite_SelectedIndexChanged(object sender, EventArgs e)
        {
            var levelText = ((Level)cbWhite.SelectedItem).GetDescription();
            if (!String.IsNullOrWhiteSpace(levelText))
            {
                var level = (Level)Enum.Parse(typeof(Level), levelText);
                whiteArtificalIntelligence = LevelToArtificalIntelligenceConverter.GetArtificalIntelligence(level);
                if (chessGame.ChessTable.TurnControl.IsWhiteTurn())
                {
                    GetNextMove(whiteArtificalIntelligence, chessGame.ChessTable.Squares.GetWhiteKingSquare);
                }
            }
        }

        private void CbBlack_SelectedIndexChanged(object sender, EventArgs e)
        {
            var levelText = ((Level)cbBlack.SelectedItem).GetDescription();
            if (!String.IsNullOrWhiteSpace(levelText))
            {
                var level = (Level)Enum.Parse(typeof(Level), levelText);
                blackArtificalIntelligence = LevelToArtificalIntelligenceConverter.GetArtificalIntelligence(level);
                if (chessGame.ChessTable.TurnControl.IsBlackTurn())
                {
                    GetNextMove(blackArtificalIntelligence, chessGame.ChessTable.Squares.GetBlackKingSquare);
                }
            }
        }

        private void TurnControl_TurnChanged(object? sender, TurnControlEventArgs e)
        {
            if (e.IsWhiteTurn)
            {
                GetNextMove(whiteArtificalIntelligence, chessGame.ChessTable.Squares.GetWhiteKingSquare);
            }
            else
            {
                GetNextMove(blackArtificalIntelligence, chessGame.ChessTable.Squares.GetBlackKingSquare);
            }
            pBoard.Invalidate();
        }

        private void GetNextMove(IArtificalIntelligence? artificalIntelligence, Func<Square> kingSquareProvider)
        {
            if (artificalIntelligence != null)
            {
                var move = artificalIntelligence.GetMove(chessGame.ChessTable);
                if (!chessGame.Execute(move))
                {
                    var kingSquare = kingSquareProvider();
                    if (kingSquare.State.HasWhiteFigure())
                    {
                        rtbMessage.Text = kingSquare.IsInCheck(chessGame.ChessTable) ? "Black won!" : "It's a draw.";
                    }
                    else
                    {
                        rtbMessage.Text = kingSquare.IsInCheck(chessGame.ChessTable) ? "White won!" : "It's a tie.";
                    }
                }
                else
                {
                    AddMoveToListView(move);
                }
            }
        }
    }
}