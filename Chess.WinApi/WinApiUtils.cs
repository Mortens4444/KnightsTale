using System;

namespace Chess.WinApi
{
    public static class WinApiUtils
    {
        public static bool Flash(IntPtr handle)
        {
            var flash = new FlashInfo(handle, FlashMode.FlashWindowTitle | FlashMode.FlashTaskbarButton | FlashMode.FlashContinuously | FlashMode.FlashUntilNotInForeground);
            return WinApiMethodDeclarations.FlashWindowEx(ref flash);
        }
    }
}
