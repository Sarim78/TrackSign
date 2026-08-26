namespace TrackSign.Converters;

using System.Globalization;
using System.Windows.Data;

/// <summary>
/// Converts a byte count to a human-readable size (KB, MB).
/// </summary>
public class FileSizeConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is not long and not int and not double)
        {
            if (value is not IConvertible)
            {
                return "0 KB";
            }
        }

        var bytes = System.Convert.ToDouble(value, culture);
        if (bytes < 1024)
        {
            return $"{bytes:0} B";
        }

        if (bytes < 1048576)
        {
            return $"{bytes / 1024:0.#} KB";
        }

        return $"{bytes / 1048576:0.#} MB";
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
