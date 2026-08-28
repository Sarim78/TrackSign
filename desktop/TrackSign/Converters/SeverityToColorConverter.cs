namespace TrackSign.Converters;

using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;

/// <summary>
/// Maps finding severity to theme brushes. Pass ConverterParameter=Background for badge fills.
/// </summary>
public class SeverityToColorConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var severity = value?.ToString()?.ToLowerInvariant();
        var background = parameter?.ToString()?.Equals("Background", StringComparison.OrdinalIgnoreCase) == true;

        var key = (severity, background) switch
        {
            ("high", true) => "SeverityHighBg",
            ("high", false) => "SeverityHigh",
            ("medium", true) => "SeverityMediumBg",
            ("medium", false) => "SeverityMedium",
            ("low", true) => "SeverityLowBg",
            ("low", false) => "SeverityLow",
            (_, true) => "CardBackground",
            _ => "TextMuted"
        };

        if (Application.Current?.TryFindResource(key) is SolidColorBrush brush)
        {
            return brush;
        }

        return Brushes.Gray;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
