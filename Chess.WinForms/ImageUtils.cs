namespace Chess.WinForms;

public static class ImageUtils
{
    public const byte DELTA = 100;

    public static Image GetFigureImage(Color figureColor, string formatString)
    {
        var baseColorString = GetBaseColorString(figureColor, out Color fromColor, out Color toColor);
        var image = Utilities.GetImageFromResource(String.Format(formatString, baseColorString));
        return TransformImage(image, fromColor, toColor, figureColor);
    }

    static string GetBaseColorString(Color figureColor, out Color fromColor, out Color toColor)
    {
        var gray = (figureColor.R + figureColor.G + figureColor.B) / 3;
        fromColor = gray >= Byte.MaxValue / 2 ? Color.White : Color.Black;

        int alpha;
        int colorValue;
        if (fromColor == Color.White)
        {
            alpha = Byte.MinValue;
            colorValue = Byte.MaxValue - DELTA;
        }
        else
        {
            alpha = Byte.MaxValue;
            colorValue = DELTA;
        }

        toColor = Color.FromArgb(alpha, colorValue, colorValue, colorValue);
        return fromColor.Name;
    }

    public static Image TransformImage(Image imgage, Color from, Color to, Color replace)
    {
        var bmp = new Bitmap(imgage);
        var bitmapInfo = new BitmapInfo(bmp);
        if (bitmapInfo.ByteCount >= 3)
        {
            bitmapInfo.Transform(from, to, replace);
        }
        else
        {
            throw new NotImplementedException();
        }
        return bmp;
    }
}

