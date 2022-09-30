using System;
using System.Collections.Generic;
using System.Linq;

namespace Chess.Utilities
{
    public static class Utils
    {
        public static IEnumerable<T> GetEnumValues<T>()
        {
            var values = Enum.GetValues(typeof(T));
            return values.OfType<T>();
        }
    }
}
