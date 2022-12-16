using Chess.Rules.Moves;
using Chess.Table;

namespace Chess.WinForms
{
    public partial class PromotePawnForm : Form
    {
        private readonly bool white;

        public SquareState ChoosenFigure { get; private set; }

        public PromotePawnForm(Move move)
        {
            InitializeComponent();

            white = move.To.State.HasWhiteFigure();
            
            btnQueen.Text = GetText(white ? SquareState.WhiteQueen : SquareState.BlackQueen);
            btnRook.Text = GetText(white ? SquareState.WhiteRook : SquareState.BlackRook);
            btnBishop.Text = GetText(white ? SquareState.WhiteBishop : SquareState.BlackBishop);
            btnKnight.Text = GetText(white ? SquareState.WhiteKnight : SquareState.BlackKnight);
        }

        private static string GetText(SquareState squareState)
        {
            return squareState.GetSquareInfo().DisplayChar.ToString();
        }


        private void BtnQueen_Click(object sender, EventArgs e)
        {
            ChoosenFigure = white ? SquareState.WhiteQueen : SquareState.BlackQueen;
        }

        private void BtnRook_Click(object sender, EventArgs e)
        {
            ChoosenFigure = white ? SquareState.WhiteRook : SquareState.BlackRook;
        }

        private void BtnBishop_Click(object sender, EventArgs e)
        {
            ChoosenFigure = white ? SquareState.WhiteBishop : SquareState.BlackBishop;
        }

        private void BtnKnight_Click(object sender, EventArgs e)
        {
            ChoosenFigure = white ? SquareState.WhiteKnight : SquareState.BlackKnight;
        }
    }
}
