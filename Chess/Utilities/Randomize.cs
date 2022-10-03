using System;
using System.Security.Cryptography;

namespace Chess.Utilities
{
    public static class Randomize
    {
        private static RandomNumberGenerator randomNumberGenerator = RandomNumberGenerator.Create();

        public static int Next(int maxValue)
        {
            var number = new byte[4];
            randomNumberGenerator.GetBytes(number);
            var result = BitConverter.ToInt32(number, 0);
            return Math.Abs(result) % maxValue;
        }
    }
}
