using Chess.Rules.Moves;
using System;
using System.IO;

namespace Chess.Utilities
{
    public class Logger
    {
        private readonly string filePath;

        public Logger(string filePath)
        {
            this.filePath = filePath;
        }

        public void Write(Move validMove)
        {
            if (!String.IsNullOrEmpty(filePath))
            {
                File.AppendAllText(filePath, $"{validMove}{Environment.NewLine}");
            }
        }
    }
}
