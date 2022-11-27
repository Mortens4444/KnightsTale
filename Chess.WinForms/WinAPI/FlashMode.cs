namespace Chess.WinForms.WinAPI
{
    [Flags]
    public enum FlashMode : uint
    {
        StopFlashing = 0,
        FlashWindowTitle = 1,
        FlashTaskbarButton = 2,
        FlashAll = 3,
        FlashContinuously = 4,
        FlashUntilNotInForeground = 12
    }
}
