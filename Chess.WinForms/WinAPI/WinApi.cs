using System.Runtime.InteropServices;

namespace Chess.WinForms.WinAPI
{
    public static class WinApi
    {
        [DllImport("User32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool FlashWindowEx(ref FlashInfo pwfi);

        [DllImport("Kernel32.dll")]
        public static extern uint GetLastError();
    }
}
