using System.Reflection;

namespace Chess.WinForms
{
    public static class Utilities
    {
        public static Image GetImageFromResource(string resourceName)
        {
            var executingAssembly = Assembly.GetExecutingAssembly();
            var manifestResourceStream = executingAssembly.GetManifestResourceStream(resourceName);
            if (manifestResourceStream == null)
            {
                throw new FileNotFoundException("Resource file not found.", resourceName);
            }
            return new Bitmap(manifestResourceStream);
        }
    }
}
