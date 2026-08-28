namespace TrackSign;

using System.Net.Http;
using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using TrackSign.Services;
using TrackSign.ViewModels;
using TrackSign.Views;

/// <summary>
/// Application entry point. Sets up dependency injection, loads branding,
/// shows login window, then main window after authentication.
/// </summary>
public partial class App : Application
{
    private ServiceProvider? _serviceProvider;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        ShutdownMode = ShutdownMode.OnExplicitShutdown;

        var services = new ServiceCollection();

        services.AddSingleton<IBrandingService, BrandingService>();
        services.AddSingleton<IAuthService, AuthService>();
        services.AddSingleton<INavigationService, NavigationService>();
        services.AddHttpClient("TrackSignApi");
        services.AddSingleton<IApiClient>(sp =>
        {
            var factory = sp.GetRequiredService<IHttpClientFactory>();
            return new ApiClient(factory.CreateClient("TrackSignApi"));
        });

        services.AddSingleton<IWindowSettingsService, WindowSettingsService>();
        services.AddTransient<LoginViewModel>();
        services.AddTransient<MainViewModel>();
        services.AddTransient<DashboardViewModel>();
        services.AddTransient<UploadViewModel>();
        services.AddTransient<ReportViewModel>();
        services.AddTransient<HistoryViewModel>();
        services.AddTransient<AnalyticsViewModel>();
        services.AddTransient<SettingsViewModel>();

        _serviceProvider = services.BuildServiceProvider();

        var branding = _serviceProvider.GetRequiredService<IBrandingService>();
        branding.Load();

        ShowLogin();
    }

    private void ShowLogin()
    {
        var provider = _serviceProvider ?? throw new InvalidOperationException("App services are not initialized.");
        var loginVm = provider.GetRequiredService<LoginViewModel>();
        var loginWindow = new LoginWindow { DataContext = loginVm };

        loginVm.LoginSucceeded += () =>
        {
            var auth = provider.GetRequiredService<IAuthService>();
            var api = provider.GetRequiredService<IApiClient>();
            if (auth.AccessToken != null)
            {
                api.SetAuthToken(auth.AccessToken);
            }

            var mainVm = provider.GetRequiredService<MainViewModel>();
            var mainWindow = new MainWindow { DataContext = mainVm };

            mainVm.LogoutRequested += () =>
            {
                mainWindow.Close();
                ShowLogin();
            };

            mainWindow.Closed += (_, _) =>
            {
                if (auth.IsAuthenticated)
                {
                    Shutdown();
                }
            };

            mainWindow.Show();
            loginWindow.Close();
        };

        loginWindow.Closed += (_, _) =>
        {
            if (Windows.OfType<MainWindow>().Any())
            {
                return;
            }

            Shutdown();
        };

        loginWindow.Show();
    }
}
