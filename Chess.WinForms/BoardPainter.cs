using Chess.Table;
using Chess.Table.TableSquare;

namespace Chess.WinForms;

public class BoardPainter
{
    public const int SquareSize = 50;
    private const float SquareSizeHalf = SquareSize / 2;
    public const int Frame = 30;
    private const float FontSize = 12;
    private const float FontSizeHalf = FontSize / 2;
    private readonly Font font = new(FontFamily.GenericSerif, FontSize);
    private readonly SolidBrush textColor = new(Color.Black);
    private readonly Pen rectangleColor = new(Color.Black);
    private readonly SolidBrush frameColor = new(Color.LightBlue);
    private readonly Color whiteFigureColor = Color.Green;
    private readonly Color blackFigureColor = Color.Blue;
    private readonly Color selectedSquareColor = Color.Turquoise;

    public void ShowChessBoard(PaintEventArgs e, SquareList tableSquares, Square? fromSquare)
    {
       e.Graphics.FillRectangle(frameColor, e.ClipRectangle);

        int delta;
        Rank fromRank;
        Column fromColumn;
        if (PlayingAsBlack)
        {
            delta = 1;
            fromRank = Rank._1;
            fromColumn = Column.H;
        }
        else
        {
            delta= -1;
            fromRank = Rank._8;
            fromColumn = Column.A;
        }

        var rankIndex = 0;
        var rank = fromRank;
        do
        {
            var columnIndex = 0;
            var top = (SquareSize + 1) * rankIndex + Frame;
            var column = fromColumn;
            do
            {
                var left = SquareSize * columnIndex + Frame;

                DrawColumnName(e.Graphics, column, FontSizeHalf, left + SquareSizeHalf - FontSizeHalf);

                var square = tableSquares[column, rank];
                var isSelected = square.Equals(fromSquare);

                SquareState squareState = DrawSquare(e.Graphics, square, isSelected, top, left);
                DrawFigure(e.Graphics, top, left, squareState);

                DrawColumnName(e.Graphics, column, (SquareSize + 1) * 8 + Frame + FontSizeHalf, left + SquareSizeHalf - FontSizeHalf);
                column -= delta;
                columnIndex++;
            }
            while (columnIndex < 8);

            DrawRankName(e.Graphics, rank, top + SquareSizeHalf - FontSize, FontSizeHalf);
            DrawRankName(e.Graphics, rank, top + SquareSizeHalf - FontSize, 8 * (SquareSize) + Frame + FontSize);
            rank += delta;
            rankIndex++;
        }
        while (rankIndex < 8);
    }

    public bool PlayingAsBlack { get; set; }

    private void DrawColumnName(Graphics graphics, Column column, float top, float left)
    {
        graphics.DrawString(column.ToString(), font, textColor, left, top);
    }

    private void DrawRankName(Graphics graphics, Rank rank, float top, float left)
    {
        graphics.DrawString(RankHelper.ToString(rank), font, textColor, left, top);
    }

    private void DrawFigure(Graphics graphics, int top, int left, SquareState squareState)
    {
        if (squareState.HasFigure())
        {
            var squareInfo = squareState.GetSquareInfo();
            var figureColor = squareState.HasWhiteFigure() ? whiteFigureColor : blackFigureColor;
            var image = ImageUtils.GetFigureImage(figureColor, $"Chess.WinForms.Figures.Images.{squareInfo.DisplayChar}.png");
            graphics.DrawImage(image, left, top, SquareSize, SquareSize);
        }
    }

    private SquareState DrawSquare(Graphics graphics, Square square, bool isSelected, int top, int left)
    {
        var squareRectangle = new Rectangle(left, top, SquareSize, SquareSize);
        graphics.DrawRectangle(rectangleColor, squareRectangle);

        var rectangle = new Rectangle(squareRectangle.X + 1, squareRectangle.Y + 1, squareRectangle.Width - 1, squareRectangle.Height - 1);
        var fillColor = GetSquareColor(square.Color, isSelected);

        graphics.FillRectangle(new SolidBrush(fillColor), rectangle);
        return square.State;
    }

    private Color GetSquareColor(SquareColor squareColor, bool isSelected)
    {
        if (isSelected)
        {
            return selectedSquareColor;
        }

        return squareColor.ToColor();
    }

    public Column GetActualColumn(int x)
    {
        if (PlayingAsBlack)
        {
            return Column.H - ModifiedPosition(x);
        }

        return Column.A + ModifiedPosition(x);
    }

    public Rank GetActualRank(int y)
    {
        if (PlayingAsBlack)
        {
            return Rank._1 + ModifiedPosition(y);
        }

        return Rank._8 - ModifiedPosition(y);
    }

    private static int ModifiedPosition(int position)
    {
        return (position - Frame) / SquareSize;
    }
}
