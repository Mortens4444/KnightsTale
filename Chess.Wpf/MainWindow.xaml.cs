using Chess.Table.TableSquare;
using System.Windows;
using System.Windows.Controls;

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
        //private IArtificalIntelligence whiteArtificalIntelligence = null;
        //private IArtificalIntelligence blackArtificalIntelligence = null;

        public MainWindow()
        {
            InitializeComponent();
            boardPainter.ShowChessBoard((Grid)FindName("ChessTable"), chessGame, fromSquare);
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
