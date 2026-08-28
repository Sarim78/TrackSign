namespace TrackSign.Views;

using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using TrackSign.ViewModels;

public partial class UploadView : UserControl
{
    public UploadView()
    {
        InitializeComponent();
    }

    private void DropZone_Click(object sender, MouseButtonEventArgs e)
    {
        if (DataContext is UploadViewModel vm)
        {
            vm.BrowseFileCommand.Execute(null);
        }
    }

    private void DropZone_DragOver(object sender, DragEventArgs e)
    {
        e.Effects = e.Data.GetDataPresent(DataFormats.FileDrop) ? DragDropEffects.Copy : DragDropEffects.None;
        e.Handled = true;
        if (DataContext is UploadViewModel vm)
        {
            vm.IsDragOver = true;
        }
    }

    private void DropZone_DragLeave(object sender, DragEventArgs e)
    {
        if (DataContext is UploadViewModel vm)
        {
            vm.IsDragOver = false;
        }
    }

    private void DropZone_Drop(object sender, DragEventArgs e)
    {
        if (DataContext is not UploadViewModel vm)
        {
            return;
        }

        vm.IsDragOver = false;
        if (e.Data.GetData(DataFormats.FileDrop) is string[] files && files.Length > 0)
        {
            vm.AcceptFile(files[0]);
        }
    }
}
