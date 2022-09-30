using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using Chess.WinForms.Extensions;

namespace Chess.WinForms
{
    public class BitmapInfo
    {
        public byte[] RGB_bytes;

        public BitmapInfo(Bitmap bmp)
        {
            Bitmap = bmp;
            BitCount = ConvertPixelFormatToBitCount(Bitmap.PixelFormat);
            ByteCount = (byte)Math.Round((double)BitCount / 8);
            RGB_bytes = GetByteArrayFromBitmap(Bitmap);
        }

        public static byte ConvertPixelFormatToBitCount(PixelFormat format)
        {
            if (format == PixelFormat.Canonical) return 32;

            var format_name = format.ToString();
            if (format_name.Substring(0, 6) != "Format")
                throw new Exception(String.Format("Unknown pixel format: {0}", format_name));

            format_name = format_name.Substring(6, 2);
            if (Char.IsNumber(format_name[1]))
                return Convert.ToByte(format_name);

            return Convert.ToByte(format_name[0].ToString());
        }

        public static byte[] GetByteArrayFromBitmap(Bitmap bitmap)
        {
            var bmp_data = bitmap.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadOnly,
                                           bitmap.PixelFormat);

            var pixel_address = bmp_data.Scan0;
            var stride_mul_height = bmp_data.Stride * bmp_data.Height;

            var bitmap_rgb_bytes = new byte[stride_mul_height];

            Marshal.Copy(pixel_address, bitmap_rgb_bytes, 0, stride_mul_height);
            bitmap.UnlockBits(bmp_data);

            return bitmap_rgb_bytes;
        }

        public static Bitmap GetBitmapFromByteArray(byte[] bitmap_rgb_bytes, int width)
        {
            var result = new Bitmap(width, bitmap_rgb_bytes.Length / width / 4);
            for (var i = 0; i < result.Height; i++)
            {
                for (var j = 0; j < result.Width; j++)
                {
                    var index = (i * width + j) * 4;
                    var c = Color.FromArgb(bitmap_rgb_bytes[index + 3], bitmap_rgb_bytes[index + 2], bitmap_rgb_bytes[index + 1],
                                           bitmap_rgb_bytes[index]);
                    result.SetPixel(j, i, c);
                }
            }
            return result;
        }

        public static void CopyByteArrayToBitmap(byte[] bitmap_rgb_bytes, Bitmap bitmap)
        {
            var bmp_data = bitmap.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadOnly,
                                           bitmap.PixelFormat);
            var pixel_address = bmp_data.Scan0;
            Marshal.Copy(bitmap_rgb_bytes, 0, pixel_address, bmp_data.Stride * bmp_data.Height);
            bitmap.UnlockBits(bmp_data);
        }

        public byte BitCount { get; set; }

        public byte ByteCount { get; set; }

        public Bitmap Bitmap { get; set; }

        public int Length
        {
            get { return RGB_bytes.Length; }
        }

        public void Transform(Color from, Color to, Color replace)
        {
            Transform(this, from, to, replace);
            CopyByteArrayToBitmap(RGB_bytes, Bitmap);
        }

        public byte this[int index]
        {
            get
            {
                return RGB_bytes[index];
            }
            set
            {
                RGB_bytes[index] = value;
            }
        }

        public static void Transform(BitmapInfo bitmap_info, Color from, Color to, Color replace)
        {
            for (var i = 0; i < bitmap_info.Length; i += bitmap_info.ByteCount)
            {
                Color c;
                if (bitmap_info.ByteCount == 3) c = Color.FromArgb(bitmap_info[i + 2], bitmap_info[i + 1], bitmap_info[i]);
                else c = Color.FromArgb(bitmap_info[i + 3], bitmap_info[i + 2], bitmap_info[i + 1], bitmap_info[i]);

                if (!c.IsColorBetweenColors(from, to))
                    continue;

                if (bitmap_info.ByteCount != 3) bitmap_info[i + 3] = replace.A;
                bitmap_info[i + 2] = replace.R;
                bitmap_info[i + 1] = replace.G;
                bitmap_info[i] = replace.B;
            }
        }
    }

}
