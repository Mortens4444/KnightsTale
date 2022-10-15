namespace Chess.WinForms.Extensions;

public static class ComboBoxExtensions
{
    public static void GetValues<T>(this ComboBox comboBox, T enumValue)
        where T : struct
    {
        comboBox.Items.Clear();
        comboBox.DataSource = Enum.GetValues(typeof(T));
        comboBox.SelectedItem = enumValue;
    }
}
