using System.Runtime.InteropServices;

namespace Chess.WinApi
{
    public static class WinApiMethodDeclarations
    {
        [DllImport("User32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool FlashWindowEx(ref FlashInfo pwfi);

        [DllImport("Kernel32.dll")]
        public static extern uint GetLastError();
    }
}
