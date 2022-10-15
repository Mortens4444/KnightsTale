using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Chess.Utilities;

public static class IListExtensions
{
    public static void RemoveAll<T>(this IList<T> list, Predicate<T> match)
    {
        Contract.Requires(list != null && match != null);

        for (int i = list.Count - 1; i >= 0; i--)
        {
            if (match.Invoke(list[i]))
            {
                list.RemoveAt(i);
            }
        }
    }
}
