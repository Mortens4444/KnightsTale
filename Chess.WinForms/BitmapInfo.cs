using Chess.WinForms.Extensions;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

namespace Chess.WinForms;

public class BitmapInfo
{
    public byte[] rgbBytes;

    public BitmapInfo(Bitmap bmp)
    {
        Bitmap = bmp;
        BitCount = ConvertPixelFormatToBitCount(Bitmap.PixelFormat);
        ByteCount = (byte)Math.Round((double)BitCount / 8);
        rgbBytes = GetByteArrayFromBitmap(Bitmap);
    }

    public static byte ConvertPixelFormatToBitCount(PixelFormat format)
    {
        if (format == PixelFormat.Canonical)
        {
            return 32;
        }

        var formatName = format.ToString();
        if (formatName.Substring(0, 6) != "Format")
        {
            throw new NotSupportedException($"Unknown pixel format: {formatName}");
        }

        formatName = formatName.Substring(6, 2);
        if (Char.IsNumber(formatName[1]))
        {
            return Convert.ToByte(formatName);
        }

        return Convert.ToByte(formatName[0].ToString());
    }

    public static byte[] GetByteArrayFromBitmap(Bitmap bitmap)
    {
        var bmpData = bitmap.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadOnly, bitmap.PixelFormat);

        var pixelAddress = bmpData.Scan0;
        var strideMultipliedByHeight = bmpData.Stride * bmpData.Height;

        var bitmapRgbBytes = new byte[strideMultipliedByHeight];

        Marshal.Copy(pixelAddress, bitmapRgbBytes, 0, strideMultipliedByHeight);
        bitmap.UnlockBits(bmpData);

        return bitmapRgbBytes;
    }

    public static Bitmap GetBitmapFromByteArray(byte[] bitmapRgbBytes, int width)
    {
        var result = new Bitmap(width, bitmapRgbBytes.Length / width / 4);
        for (var row = 0; row < result.Height; row++)
        {
            for (var column = 0; column < result.Width; column++)
            {
                var index = (row * width + column) * 4;
                var color = Color.FromArgb(bitmapRgbBytes[index + 3], bitmapRgbBytes[index + 2], bitmapRgbBytes[index + 1], bitmapRgbBytes[index]);
                result.SetPixel(column, row, color);
            }
        }
        return result;
    }

    public static void CopyByteArrayToBitmap(byte[] bitmapRgbBytes, Bitmap bitmap)
    {
        var bmpData = bitmap.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadOnly, bitmap.PixelFormat);
        var pixelAddress = bmpData.Scan0;
        Marshal.Copy(bitmapRgbBytes, 0, pixelAddress, bmpData.Stride * bmpData.Height);
        bitmap.UnlockBits(bmpData);
    }

    public byte BitCount { get; set; }

    public byte ByteCount { get; set; }

    public Bitmap Bitmap { get; set; }

    public int Length => rgbBytes.Length;

    public void Transform(Color from, Color to, Color replace)
    {
        Transform(this, from, to, replace);
        CopyByteArrayToBitmap(rgbBytes, Bitmap);
    }

    public byte this[int index]
    {
        get
        {
            return rgbBytes[index];
        }
        set
        {
            rgbBytes[index] = value;
        }
    }

    public static void Transform(BitmapInfo bitmapInfo, Color from, Color to, Color replace)
    {
        for (var i = 0; i < bitmapInfo.Length; i += bitmapInfo.ByteCount)
        {
            Color color = bitmapInfo.ByteCount == 3 ?
                Color.FromArgb(bitmapInfo[i + 2], bitmapInfo[i + 1], bitmapInfo[i]) :
                Color.FromArgb(bitmapInfo[i + 3], bitmapInfo[i + 2], bitmapInfo[i + 1], bitmapInfo[i]);

            if (!color.IsColorBetweenColors(from, to))
            {
                continue;
            }

            if (bitmapInfo.ByteCount != 3)
            {
                bitmapInfo[i + 3] = replace.A;
            }
            bitmapInfo[i + 2] = replace.R;
            bitmapInfo[i + 1] = replace.G;
            bitmapInfo[i] = replace.B;
        }
    }
}

