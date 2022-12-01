using System;
using System.Runtime.InteropServices;

namespace Chess.WinApi
{
    [StructLayout(LayoutKind.Sequential)]

    public struct FlashInfo
    {
        public uint cbSize = UInt32.MinValue;

        public IntPtr Handle;

        public uint dwFlags;

        public uint Count = UInt32.MaxValue;

        public uint Timeout = UInt32.MinValue;

        public FlashInfo(IntPtr handle, FlashMode flashMode)
        {
            Handle = handle;
            dwFlags = (uint)flashMode;
            cbSize = Convert.ToUInt32(Marshal.SizeOf(this));
        }
    }
}
