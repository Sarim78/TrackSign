namespace TrackSign.Converters;

using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

/// <summary>
/// Maps finding severity (high / medium / low) to red / amber / green.
/// </summary>
public class SeverityToColorConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var severity = value?.ToString()?.ToLowerInvariant();
        var hex = severity switch
        {
            "high" => "#EF4444",
            "medium" => "#F59E0B",
            "low" => "#22C55E",
            _ => "#999999"
        };

        return (SolidColorBrush)new BrushConverter().ConvertFrom(hex)!;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
