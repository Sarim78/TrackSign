namespace TrackSign.Services;

using System.Windows;
using System.Windows.Interop;

/// <summary>
/// Enables Aero snap and resize for a borderless window via WM_NCHITTEST.
/// </summary>
public static class WindowChromeHook
{
    private const int WmNcHitTest = 0x0084;
    private const int HtClient = 1;
    private const int HtCaption = 2;
    private const int HtLeft = 10;
    private const int HtRight = 11;
    private const int HtTop = 12;
    private const int HtTopLeft = 13;
    private const int HtTopRight = 14;
    private const int HtBottom = 15;
    private const int HtBottomLeft = 16;
    private const int HtBottomRight = 17;
    private const int ResizeBorder = 8;

    public static void Attach(Window window, FrameworkElement titleBar)
    {
        window.SourceInitialized += (_, _) =>
        {
            var source = PresentationSource.FromVisual(window) as HwndSource;
            source?.AddHook((IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled) =>
                Hook(window, titleBar, msg, lParam, ref handled));
        };
    }

    private static IntPtr Hook(Window window, FrameworkElement titleBar, int msg, IntPtr lParam, ref bool handled)
    {
        if (msg != WmNcHitTest)
        {
            return IntPtr.Zero;
        }

        var mouse = GetMouse(lParam);
        var point = window.PointFromScreen(mouse);
        var width = window.ActualWidth;
        var height = window.ActualHeight;

        var left = point.X <= ResizeBorder;
        var right = point.X >= width - ResizeBorder;
        var top = point.Y <= ResizeBorder;
        var bottom = point.Y >= height - ResizeBorder;

        if (top && left) { handled = true; return HtTopLeft; }
        if (top && right) { handled = true; return HtTopRight; }
        if (bottom && left) { handled = true; return HtBottomLeft; }
        if (bottom && right) { handled = true; return HtBottomRight; }
        if (left) { handled = true; return HtLeft; }
        if (right) { handled = true; return HtRight; }
        if (top) { handled = true; return HtTop; }
        if (bottom) { handled = true; return HtBottom; }

        if (titleBar != null)
        {
            var titlePoint = titleBar.PointFromScreen(mouse);
            if (titlePoint.X >= 0 && titlePoint.Y >= 0 &&
                titlePoint.X <= titleBar.ActualWidth && titlePoint.Y <= titleBar.ActualHeight)
            {
                handled = true;
                return HtCaption;
            }
        }

        handled = true;
        return HtClient;
    }

    private static Point GetMouse(IntPtr lParam)
    {
        var xy = lParam.ToInt64();
        var x = (short)(xy & 0xFFFF);
        var y = (short)((xy >> 16) & 0xFFFF);
        return new Point(x, y);
    }
}
