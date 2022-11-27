using System.Runtime.InteropServices;

namespace Chess.WinForms.WinAPI
{
    public static class WinApiUtils
    {
        public static bool Flash(IntPtr handle)
        {
            var flash = new FlashInfo(handle, FlashMode.FlashAll | FlashMode.FlashUntilNotInForeground);
            return WinApi.FlashWindowEx(ref flash);
        }
    }
}
