using Chess.AI;
using Chess.Rules.Moves;
using Chess.Table.TableSquare;
using Microsoft.Win32;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Chess.WinApi;
using System.Windows.Interop;
using Chess.Rules.Turns;
using System.Threading.Tasks;
using Chess.Utilities;
using Chess.Table;

namespace Chess.Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const string ChessTableName = "ChessTable";
        private readonly BoardPainter boardPainter = new BoardPainter();
        private readonly ChessGame chessGame = new ChessGame();
        private Square fromSquare = null;
        private readonly ObservableCollection<MoveWithTime> moves = new ObservableCollection<MoveWithTime>();
        private IArtificalIntelligence whiteArtificalIntelligence = null;
        private IArtificalIntelligence blackArtificalIntelligence = null;

        public MainWindow()
        {
            InitializeComponent();
            lvMoves.ItemsSource = moves;
            cbWhiteAI.ItemsSource = Enum.GetValues(typeof(Level)).Cast<Level>();
            cbWhiteAI.SelectedIndex = 0;
            cbBlackAI.ItemsSource = Enum.GetValues(typeof(Level)).Cast<Level>();
            cbBlackAI.SelectedIndex = 0;

            boardPainter.CreateChessBoard((Grid)FindName(ChessTableName));
            Repaint();

            chessGame.ChessTable.TurnControl.TurnChanged += TurnControl_TurnChanged;
        }

        private void NewGame_Click(object sender, RoutedEventArgs e)
        {
            chessGame.ChessTable.SetupTable();
            moves.Clear();
            Repaint();
            GetNextMove();
        }

        private void LoadGame_Click(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "Chess game files|*.cgs|All files|*.*"
            };
            if (openFileDialog.ShowDialog() == true)
            {
                chessGame.ChessTable.LoadFromFile(openFileDialog.FileName);
                Repaint();
            }
        }

        private void SaveGame_Click(object sender, RoutedEventArgs e)
        {
            var saveFileDialog = new SaveFileDialog
            {
                Filter = "Chess game files|*.cgs|All files|*.*"
            };
            if (saveFileDialog.ShowDialog() == true)
            {
                chessGame.ChessTable.SaveToFile(saveFileDialog.FileName);
            }
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void Repaint()
        {
            Dispatcher.Invoke(() =>
            {
                var grid = (Grid)FindName(ChessTableName);
                boardPainter.ShowChessBoard(grid, chessGame.ChessTable.FinalizedSquares, fromSquare);
            });
        }

        private void ChessTable_PreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            Move move = null;
            try
            {
                var clickLocation = Mouse.GetPosition(Application.Current.MainWindow);
                if (fromSquare == null)
                {
                    fromSquare = GetSquare(clickLocation);
                }
                else
                {
                    var toSquare = GetSquare(clickLocation);
                    if (fromSquare != toSquare)
                    {
                        move = new Move(fromSquare, toSquare);
                        if (chessGame.Execute(move))
                        {
                            moves.Add(chessGame.ChessTable.LastMove);
                            lvMoves.ScrollIntoView(lvMoves.Items[lvMoves.Items.Count - 1]);
                            WinApiUtils.Flash(new WindowInteropHelper(this).Handle);
                            Console.Beep();
                        }
                        else
                        {
                            MessageBox.Show($"The move ({move}) is not valid.", "Invalid move", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                    }

                    fromSquare = null;
                }
                Repaint();
            }
            catch (Exception ex)
            {
                var message = move == null ? ex.Message : $"{ex.Message} You tried: {move}";
                MessageBox.Show(message, "This move is invalid", MessageBoxButton.OK, MessageBoxImage.Error);
                fromSquare = null;
            }

        }

        private Square GetSquare(Point clickLocation)
        {
            var column = GetActualColumn(BoardPainter.SquareSize + (BoardPainter.SquareSize / 2) + 5, clickLocation.X);
            var rank = GetActualRank(BoardPainter.SquareSize - 1, clickLocation.Y);
            return chessGame.ChessTable.Squares[column, rank];
        }

        public static Column GetActualColumn(int horizontalDelta, double x)
        {
            return (int)Math.Round((x - horizontalDelta) / BoardPainter.SquareSize) + Column.A;
        }

        public static Rank GetActualRank(int verticalDelta, double y)
        {
            return Rank._8 - (int)Math.Round((y - verticalDelta) / BoardPainter.SquareSize - 1);
        }

        private void CbWhiteAI_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var levelText = ((Level)cbWhiteAI.SelectedItem).GetDescription();
            if (!String.IsNullOrWhiteSpace(levelText))
            {
                var level = (Level)Enum.Parse(typeof(Level), levelText);
                whiteArtificalIntelligence = LevelToArtificalIntelligenceConverter.GetArtificalIntelligence(level);
                GetNextMove();
            }
        }

        private void CbBlackAI_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var levelText = ((Level)cbBlackAI.SelectedItem).GetDescription();
            if (!String.IsNullOrWhiteSpace(levelText))
            {
                var level = (Level)Enum.Parse(typeof(Level), levelText);
                blackArtificalIntelligence = LevelToArtificalIntelligenceConverter.GetArtificalIntelligence(level);
                GetNextMove();
            }
        }

        private void TurnControl_TurnChanged(object sender, TurnControlEventArgs e)
        {
            Task.Factory.StartNew(() =>
            {
                GetNextMove();
            });
        }

        private void GetNextMove()
        {
            if (chessGame.ChessTable.TurnControl.IsWhiteTurn())
            {
                GetNextMove(whiteArtificalIntelligence, chessGame.ChessTable.Squares.GetWhiteKingSquare);
            }
            if (chessGame.ChessTable.TurnControl.IsBlackTurn())
            {
                GetNextMove(blackArtificalIntelligence, chessGame.ChessTable.Squares.GetBlackKingSquare);
            }
            Repaint();
        }

        private void GetNextMove(IArtificalIntelligence artificalIntelligence, Func<Square> kingSquareProvider)
        {
            if (artificalIntelligence != null)
            {
                var move = artificalIntelligence.GetMove(chessGame.ChessTable);
                if (!chessGame.Execute(move))
                {
                    var kingSquare = kingSquareProvider();
                    string message;
                    if (kingSquare.State.HasWhiteFigure())
                    {
                        message = kingSquare.IsInCheck(chessGame.ChessTable) ? "Black won!" : "It's a draw.";
                    }
                    else
                    {
                        message = kingSquare.IsInCheck(chessGame.ChessTable) ? "White won!" : "It's a tie.";
                    }

                    MessageBox.Show(message, "Game over", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    Dispatcher.Invoke(() => { moves.Add(chessGame.ChessTable.LastMove); });
                }
            }
        }

        public void Rollback_Click(object sender, RoutedEventArgs e)
        {
            if (lvMoves.SelectedItems.Count == 1)
            {
                var toIndex = lvMoves.SelectedIndex;
                for (int i = lvMoves.Items.Count - 1; i >= toIndex; i--)
                {
                    lvMoves.Items.RemoveAt(i);
                    chessGame.ChessTable.RemoveLast();
                }
                chessGame.ChessTable.TurnControl.SendTurnNotification();
                Repaint();
            }
        }
    }
}