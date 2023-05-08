using System;

namespace Chess.WinApi
{
    [Flags]
    public enum FlashMode
    {
        None = 0,
        FlashWindowTitle = 1,
        FlashTaskbarButton = 2,
        FlashContinuously = 4,
        FlashUntilNotInForeground = 8
    }
}
