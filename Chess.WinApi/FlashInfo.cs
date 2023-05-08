using System;
using System.Runtime.InteropServices;

namespace Chess.WinApi
{
    [StructLayout(LayoutKind.Sequential)]

    public struct FlashInfo : IEquatable<FlashInfo>
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

        public override bool Equals(object? obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            return FlashInfoEquals((FlashInfo)obj);
        }

        private readonly bool FlashInfoEquals(FlashInfo other)
        {
            return cbSize == other.cbSize &&
                   Handle == other.Handle &&
                   dwFlags == other.dwFlags &&
                   Count == other.Count &&
                   Timeout == other.Timeout;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(cbSize, Handle, dwFlags, Count, Timeout);
        }

        public static bool operator ==(FlashInfo left, FlashInfo right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(FlashInfo left, FlashInfo right)
        {
            return !(left == right);
        }

        public bool Equals(FlashInfo other)
        {
            return FlashInfoEquals(other);
        }
    }
}
