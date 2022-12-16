using Chess.Rules.Moves;
using Chess.Table;
using System.Windows;

namespace Chess.Wpf
{
    /// <summary>
    /// Interaction logic for PromotePawnWindow.xaml
    /// </summary>
    public partial class PromotePawnWindow : Window
    {
        private readonly bool white;

        public SquareState ChoosenFigure { get; private set; }

        public PromotePawnWindow(Move move)
        {
            InitializeComponent();

            white = move.To.State.HasWhiteFigure();

            btnQueen.Content = GetText(white ? SquareState.WhiteQueen : SquareState.BlackQueen);
            btnRook.Content = GetText(white ? SquareState.WhiteRook : SquareState.BlackRook);
            btnBishop.Content = GetText(white ? SquareState.WhiteBishop : SquareState.BlackBishop);
            btnKnight.Content = GetText(white ? SquareState.WhiteKnight : SquareState.BlackKnight);
        }

        private static string GetText(SquareState squareState)
        {
            return squareState.GetSquareInfo().DisplayChar.ToString();
        }

        private void Queen_Click(object sender, RoutedEventArgs e)
        {
            SetResult(white ? SquareState.WhiteQueen : SquareState.BlackQueen);
        }

        private void Rook_Click(object sender, RoutedEventArgs e)
        {
            SetResult(white ? SquareState.WhiteRook : SquareState.BlackRook);
        }

        private void Bishop_Click(object sender, RoutedEventArgs e)
        {
            SetResult(white ? SquareState.WhiteBishop : SquareState.BlackBishop);
        }

        private void Knight_Click(object sender, RoutedEventArgs e)
        {
            SetResult(white? SquareState.WhiteKnight : SquareState.BlackKnight);
        }

        private void SetResult(SquareState squareState)
        {
            ChoosenFigure = squareState;
            DialogResult = true;
        }
    }
}
