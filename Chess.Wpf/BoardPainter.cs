using Chess.Table;
using Chess.Table.TableSquare;
using Chess.Utilities;
using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace Chess.Wpf
{
    public class BoardPainter
    {
        public const int SquareSize = 50;

        public bool PlayingAsBlack { get; set; }

        public void CreateChessBoard(Grid chessTable)
        {
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
        }


        public void ShowChessBoard(Grid chessTable, SquareList tableSquares, Square fromSquare)
        {
            var columns = Utils.GetEnumValues<Column>().ToList();
            var ranks = Utils.GetEnumValues<Rank>().ToList();
            ranks.Sort(new ReverseRankSorter());
            chessTable.Children.Clear();
            foreach (var rank in ranks)
            {
                var rowNumber = PlayingAsBlack ? (int)rank : 9 - (int)rank;
                var leftRankTextBlock = CreateTextBlock(chessTable, RankHelper.ToString(rank), Colors.Black, $"0{rowNumber}");
                SetColumnAndRank(leftRankTextBlock, 0, rowNumber);

                foreach (var column in columns)
                {
                    var columnNumber = PlayingAsBlack ? 9 - (int)column : (int)column;
                    var leftColumnTextBlock = CreateTextBlock(chessTable, column.ToString(), Colors.Black, $"{columnNumber}0");
                    SetColumnAndRank(leftColumnTextBlock, columnNumber, 0);

                    CreateColoredSquare(chessTable, fromSquare, rank, rowNumber, column, columnNumber);

                    var state = tableSquares[column, rank].State;
                    var squareInfo = state.GetSquareInfo();

                    var textBlock = CreateTextBlock(chessTable, squareInfo.DisplayChar.ToString(), state.HasBlackFigure() ? Colors.Green : Colors.RoyalBlue, $"{columnNumber}{rowNumber}");
                    SetColumnAndRank(textBlock, columnNumber, rowNumber);

                    var rightColumnTextBlock = CreateTextBlock(chessTable, column.ToString(), Colors.Black, $"{columnNumber}9");
                    SetColumnAndRank(rightColumnTextBlock, columnNumber, 9);
                }

                var rightRankTextBlock = CreateTextBlock(chessTable, RankHelper.ToString(rank), Colors.Black, $"9{rowNumber}");
                SetColumnAndRank(rightRankTextBlock, 9, rowNumber);
            }
        }

        private void CreateColoredSquare(Grid chessTable, Square fromSquare, Rank rank, int rowNumber, Column column, int columnNumber)
        {
            var color = ((int)column + (int)rank) % 2 == 0 ? Colors.Black : Colors.White;
            var isSelected = fromSquare?.Column == column && fromSquare?.Rank == rank;
            var square = new Rectangle
            {
                Fill = new SolidColorBrush(isSelected ? Colors.Gray : color)
            };
            chessTable.Children.Add(square);
            SetColumnAndRank(square, columnNumber, rowNumber);
        }

        private TextBlock CreateTextBlock(Grid grid, string text, Color color, string name)
        {
            var result = new TextBlock
            {
                Text = text,
                FontSize = 25,
                Foreground = new SolidColorBrush(color),
                HorizontalAlignment = HorizontalAlignment.Center,
                VerticalAlignment = VerticalAlignment.Center
            };
            grid.Children.Add(result);
            return result;
        }

        private void SetColumnAndRank(FrameworkElement frameworkElement, int column, int rank)
        {
            Grid.SetRow(frameworkElement, rank);
            Grid.SetColumn(frameworkElement, column);
        }

        public Column GetActualColumn(double x)
        {
            var horizontalDelta = SquareSize + (SquareSize / 2) + 5;
            var delta = (int)Math.Round((x - horizontalDelta) / SquareSize);
            if (PlayingAsBlack)
            {
                return Column.H - delta;
            }

            return Column.A + delta;
        }

        public Rank GetActualRank(double y)
        {
            var delta = (int)Math.Round((y - (SquareSize - 1)) / SquareSize - 1);
            if (PlayingAsBlack)
            {
                return Rank._1 + delta;
            }

            return Rank._8 - delta;
        }
    }
}
