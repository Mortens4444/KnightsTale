using Chess.FigureValues;
using Chess.Table;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace Chess.Test.FigureValues;

public class FigureValueCalculatorTest
{
    [TestCase(FigureValueCalculationMode.General, SquareState.WhiteQueen, 9)]
    public void FigureValueTest(FigureValueCalculationMode figureValueCalculationMode, SquareState squareState, double? expectedValue)
    {
        var figureValueCalculator = new FigureValueCalculator(figureValueCalculationMode);
        var actualValue = figureValueCalculator.GetValue(squareState);
        ClassicAssert.AreEqual(expectedValue, actualValue);
    }
}
