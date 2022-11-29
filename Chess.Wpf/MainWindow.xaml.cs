using Chess.Rules.Moves;
using Chess.Table.TableSquare;
using Microsoft.Win32;
using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace Chess.Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly BoardPainter boardPainter = new BoardPainter();
        private readonly ChessGame chessGame = new ChessGame();
        private Square fromSquare = null;
        private readonly ObservableCollection<MoveWithTime> moves = new ObservableCollection<MoveWithTime>();
        //private IArtificalIntelligence whiteArtificalIntelligence = null;
        //private IArtificalIntelligence blackArtificalIntelligence = null;

        public MainWindow()
        {
            InitializeComponent();
            lvMoves.ItemsSource = moves;

            boardPainter.CreateChessBoard((Grid)FindName("ChessTable"));
            Repaint();
        }

        private void NewGame_Click(object sender, RoutedEventArgs e)
        {
            chessGame.ChessTable.SetupTable();
            Repaint();
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
            boardPainter.ShowChessBoard((Grid)FindName("ChessTable"), chessGame.ChessTable.FinalizedSquares, fromSquare);
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
                            //WinApiUtils.Flash(Handle);
                            Console.Beep();
                        }
                        else
                        {
                            //rtbMessage.Text = $"The move ({move}) is not valid.";
                        }
                    }

                    fromSquare = null;
                }
                Repaint();
            }
            catch (Exception ex)
            {
                var message = move == null ? ex.Message : $"{ex.Message} You tried: {move}";
                //rtbMessage.Text = message;
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

        //private void AddMoveToListView()
        //{
        //    var number = lvMoves.Items.Count + 1;
        //    var item = new ListViewItem(number.ToString())
        //    {
        //        BackColor = lvMoves.Items.Count % 2 == 0 ? Color.LightBlue : lvMoves.BackColor
        //    };

        //    var lastMove = chessGame.ChessTable.LastMove;
        //    item.SubItems.Add(lastMove.Move.ToString());
        //    item.SubItems.Add(lastMove.Time.ToString());
        //    item.Tag = lastMove;
        //    Invoke(() =>
        //    {
        //        lvMoves.Items.Add(item);
        //        lvMoves.EnsureVisible(lvMoves.Items.Count - 1);
        //        WinApiUtils.Flash(Handle);
        //        Console.Beep();
        //    });
        //}

        public void Rollback_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}