using Chess.AI;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Chess.Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        //private readonly BoardPainter boardPainter = new BoardPainter();
        private readonly ChessGame chessGame = new ChessGame();
        //private Square fromSquare = null;
        //private IArtificalIntelligence whiteArtificalIntelligence = null;
        //private IArtificalIntelligence blackArtificalIntelligence = null;

        public MainWindow()
        {
            InitializeComponent();
            CreateChessTable();
        }

        private void CreateChessTable()
        {
            var columns = Utils.GetEnumValues<Column>().ToList();
            var ranks = Utils.GetEnumValues<Rank>().ToList();
            ranks.Sort(new ReverseRankSorter());

            var chessTable = (Grid)FindName("ChessTable");
            foreach (var column in columns)
            {
                foreach (var rank in ranks)
                {
                    var square = new Rectangle();
                    var color = (int)column % 2 == 0 && (int)rank % 2 == 0 ? Colors.Black : Colors.White;
                    square.Fill = new SolidColorBrush(color);
                    Grid.SetRow(square, (int)rank);
                    Grid.SetColumn(square, (int)column);
                    chessTable.Children.Add(square);
                }
            }
        }

        private void NewGame_Click(object sender, RoutedEventArgs e)
        {
            chessGame.ChessTable.SetupTable();
            //pBoard.Invalidate();
            //lvMoves.Items.Clear();
            //rtbMessage.Text = String.Empty;
        }

        private void LoadGame_Click(object sender, RoutedEventArgs e)
        {
            //if (openFileDialog.ShowDialog() == DialogResult.OK)
            //{
            //    chessGame.ChessTable.LoadFromFile(openFileDialog.FileName);
            //    pBoard.Invalidate();
            //}
        }

        private void SaveGame_Click(object sender, RoutedEventArgs e)
        {
            //if (saveFileDialog.ShowDialog() == DialogResult.OK)
            //{
            //    chessGame.ChessTable.SaveToFile(saveFileDialog.FileName);
            //    pBoard.Invalidate();
            //}
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
