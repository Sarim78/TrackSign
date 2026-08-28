namespace TrackSign.Converters;

using System.Globalization;
using System.Windows;
using System.Windows.Data;

/// <summary>
/// Visible when ScanStep is greater than ConverterParameter (step is complete).
/// </summary>
public class GreaterThanToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is not int current || !int.TryParse(parameter?.ToString(), out var step))
        {
            return Visibility.Collapsed;
        }

        return current > step ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}

/// <summary>
/// Visible when ScanStep equals ConverterParameter (step is current).
/// </summary>
public class EqualsToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is not int current || !int.TryParse(parameter?.ToString(), out var step))
        {
            return Visibility.Collapsed;
        }

        return current == step ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}

/// <summary>
/// Visible when ScanStep is less than ConverterParameter (step is pending).
/// </summary>
public class LessThanToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is not int current || !int.TryParse(parameter?.ToString(), out var step))
        {
            return Visibility.Collapsed;
        }

        return current < step ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
