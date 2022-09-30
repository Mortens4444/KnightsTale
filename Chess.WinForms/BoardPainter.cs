using Chess.Table;
using Chess.Table.TableSquare;
using System.Diagnostics.Contracts;

namespace Chess.WinForms
{
    public class BoardPainter
    {
        public const int SquareHeight = 50;
        public const int SquareWidth = 50;
        public const int Frame = 30;
        private readonly Pen rectangleColor = new(Color.Black);
        private readonly SolidBrush frameColor = new(Color.LightBlue);

        public void ShowChessBoard(PaintEventArgs e, ChessTable chessTable, Square? fromSquare)
        {
            //var frame_rectangle = new Rectangle(e.ClipRectangle.X + Frame, e.ClipRectangle.Y + Frame, e.ClipRectangle.Width - 2 * Frame, e.ClipRectangle.Height - 2 * Frame);

            e.Graphics.FillRectangle(frameColor, e.ClipRectangle);

            int left, top;
            Square? possible_selected_square = null;
            for (var rank = Rank._8; rank >= Rank._1; rank--)
            {
                for (var column = Column.A; column <= Column.H; column++)
                {
                    top = (SquareHeight + 1) * (8 - (int)rank) + Frame;
                    left = SquareWidth * ((int)column - 1) + Frame;
                    var color = Square.GetColor(column, rank);

                    var squareRectangle = new Rectangle(left, top, SquareWidth, SquareHeight);
                    e.Graphics.DrawRectangle(rectangleColor, squareRectangle);

                    var rectangle = new Rectangle(squareRectangle.X + 1, squareRectangle.Y + 1, squareRectangle.Width - 1, squareRectangle.Height - 1);
                    var square = chessTable.Squares[column, rank];
                    var fillColor = GetSquareColor(fromSquare, rank, column, square.Color);

                    e.Graphics.FillRectangle(new SolidBrush(fillColor), rectangle);

                    if (square.State.HasFigure())
                    {
                        var squareInfo = square.State.GetSquareInfo();
                        var figureColor = square.State.HasWhiteFigure() ? Color.Green : Color.Blue;
                        var image = ImageUtils.GetFigureImage(figureColor, $"Chess.WinForms.Figures.Images.{squareInfo.DisplayChar}.png");
                        e.Graphics.DrawImage(image, left, top, SquareWidth, SquareHeight);
                    }

                    if (square.PossibleSelected)
                    {
                        possible_selected_square = square;
                    }
                }
            }
        }

        private static Color GetSquareColor(Square? fromSquare, Rank rank, Column column, SquareColor squareColor)
        {
            if (fromSquare != null && column == fromSquare.Column && rank == fromSquare.Rank)
            {
                return Color.Turquoise;
            }

            return squareColor.ToColor();
        }
    }
}
