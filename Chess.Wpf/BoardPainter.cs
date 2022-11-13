using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Chess.Wpf
{
    public class BoardPainter
    {
        private const int SquareSize = 50;

        public void ShowChessBoard(Grid chessTable, ChessGame chessGame, Square fromSquare)
        {
            var columns = Utils.GetEnumValues<Column>().ToList();
            var ranks = Utils.GetEnumValues<Rank>().ToList();
            ranks.Sort(new ReverseRankSorter());

            for (int i = 0; i < 10; i++)
            {
                chessTable.RowDefinitions.Add(new RowDefinition()
                {
                    Height = new GridLength(SquareSize)
                });
                chessTable.ColumnDefinitions.Add(new ColumnDefinition()
                {
                    Width = new GridLength(SquareSize)
                });
            }

            foreach (var rank in ranks)
            {
                var rowNumber = 9 - (int)rank;
                var leftRankTextBlock = CreateTextBlock(RankHelper.ToString(rank), Colors.Black);
                SetColumnAndRank(chessTable, leftRankTextBlock, 0, rowNumber);

                foreach (var column in columns)
                {
                    var leftColumnTextBlock = CreateTextBlock(column.ToString(), Colors.Black);
                    SetColumnAndRank(chessTable, leftColumnTextBlock, (int)column, 0);

                    var color = ((int)column + (int)rank) % 2 == 0 ? Colors.Black : Colors.White;
                    var square = new Rectangle
                    {
                        Fill = new SolidColorBrush(color)
                    };
                    SetColumnAndRank(chessTable, square, (int)column, rowNumber);

                    var state = chessGame.ChessTable.Squares[column, rank].State;
                    var squareInfo = state.GetSquareInfo();

                    var textBlock = CreateTextBlock(squareInfo.DisplayChar.ToString(), state.HasBlackFigure() ? Colors.Green : Colors.LightBlue);
                    SetColumnAndRank(chessTable, textBlock, (int)column, rowNumber);

                    var rightColumnTextBlock = CreateTextBlock(column.ToString(), Colors.Black);
                    SetColumnAndRank(chessTable, rightColumnTextBlock, (int)column, 9);
                }

                var rightRankTextBlock = CreateTextBlock(RankHelper.ToString(rank), Colors.Black);
                SetColumnAndRank(chessTable, rightRankTextBlock, 9, rowNumber);
            }
        }

        private static TextBlock CreateTextBlock(string text, Color color)
        {
            return new TextBlock
            {
                Text = text,
                FontSize = 25,
                Foreground = new SolidColorBrush(color),
                HorizontalAlignment = HorizontalAlignment.Center,
                VerticalAlignment = VerticalAlignment.Center
            };
        }

        private void SetColumnAndRank(Grid grid, FrameworkElement frameworkElement, int column, int rank)
        {
            grid.Children.Add(frameworkElement);
            Grid.SetRow(frameworkElement, rank);
            Grid.SetColumn(frameworkElement, column);
        }
    }
}
