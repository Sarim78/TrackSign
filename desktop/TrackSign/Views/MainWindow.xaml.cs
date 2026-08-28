namespace TrackSign.Views;

using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Animation;
using TrackSign.Services;
using TrackSign.ViewModels;

public partial class MainWindow : Window
{
    private readonly IWindowSettingsService _windowSettings = new WindowSettingsService();

    public MainWindow()
    {
        InitializeComponent();
        DataContextChanged += OnDataContextChanged;
        WindowChromeHook.Attach(this, TitleBar);
    }

    private void Window_Loaded(object sender, RoutedEventArgs e)
    {
        var bounds = _windowSettings.Load();
        if (bounds.Width >= MinWidth && bounds.Height >= MinHeight)
        {
            Width = bounds.Width;
            Height = bounds.Height;
            Left = bounds.Left;
            Top = bounds.Top;
        }

        if (bounds.Maximized)
        {
            WindowState = WindowState.Maximized;
        }

        FadeContentIn();
    }

    private void Window_Closing(object sender, CancelEventArgs e)
    {
        _windowSettings.Save(new WindowBounds
        {
            Left = WindowState == WindowState.Normal ? Left : RestoreBounds.Left,
            Top = WindowState == WindowState.Normal ? Top : RestoreBounds.Top,
            Width = WindowState == WindowState.Normal ? Width : RestoreBounds.Width,
            Height = WindowState == WindowState.Normal ? Height : RestoreBounds.Height,
            Maximized = WindowState == WindowState.Maximized
        });
    }

    private void TitleBar_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ClickCount == 2)
        {
            Maximize_Click(sender, e);
            return;
        }

        DragMove();
    }

    private void Minimize_Click(object sender, RoutedEventArgs e) => WindowState = WindowState.Minimized;

    private void Maximize_Click(object sender, RoutedEventArgs e) =>
        WindowState = WindowState == WindowState.Maximized ? WindowState.Normal : WindowState.Maximized;

    private void Close_Click(object sender, RoutedEventArgs e) => Close();

    private void Account_Click(object sender, RoutedEventArgs e)
    {
        var menu = new ContextMenu();
        menu.Items.Add(new MenuItem { Header = "Settings", Command = (DataContext as MainViewModel)?.NavigateToCommand, CommandParameter = "Settings" });
        menu.Items.Add(new MenuItem { Header = "Sign out", Command = (DataContext as MainViewModel)?.LogoutCommand });
        menu.PlacementTarget = sender as Button;
        menu.IsOpen = true;
    }

    private void OnDataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
    {
        if (e.OldValue is INotifyPropertyChanged oldVm)
        {
            oldVm.PropertyChanged -= OnViewModelPropertyChanged;
        }

        if (e.NewValue is INotifyPropertyChanged newVm)
        {
            newVm.PropertyChanged += OnViewModelPropertyChanged;
        }
    }

    private void OnViewModelPropertyChanged(object? sender, PropertyChangedEventArgs e)
    {
        if (e.PropertyName == nameof(MainViewModel.CurrentContent))
        {
            FadeContentIn();
        }

        if (e.PropertyName == nameof(MainViewModel.IsSidebarCollapsed) && DataContext is MainViewModel vm)
        {
            AnimateSidebar(vm.IsSidebarCollapsed ? 48 : 220);
        }
    }

    private void AnimateSidebar(double width)
    {
        Sidebar.BeginAnimation(WidthProperty, new DoubleAnimation(Sidebar.Width, width, TimeSpan.FromMilliseconds(200)));
    }

    private void FadeContentIn()
    {
        ContentHost?.BeginAnimation(OpacityProperty, new DoubleAnimation(0, 1, TimeSpan.FromMilliseconds(150)));
    }
}
