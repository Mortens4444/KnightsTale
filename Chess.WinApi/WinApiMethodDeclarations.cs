using System.Runtime.InteropServices;

namespace Chess.WinApi
{
    public static class WinApiMethodDeclarations
    {
        [DllImport("User32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        internal static extern bool FlashWindowEx(ref FlashInfo pwfi);

        [DllImport("Kernel32.dll")]
        internal static extern uint GetLastError();
    }
}
