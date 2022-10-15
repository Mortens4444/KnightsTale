namespace Chess.WinForms.Extensions;

public static class ColorExtensions
{
    public static bool IsColorBetweenColors(this Color value, Color from, Color to)
    {

        int min_A = Math.Min(from.A, to.A);
        if (value.A >= min_A && value.A <= Math.Abs(from.A - to.A) + min_A)
        {
            int min_R = Math.Min(from.R, to.R);
            if (value.R >= min_R && value.R <= Math.Abs(from.R - to.R) + min_R)
            {
                int min_G = Math.Min(from.G, to.G);
                if (value.G >= min_G && value.G <= Math.Abs(from.G - to.G) + min_G)
                {
                    int min_B = Math.Min(from.B, to.B);
                    if (value.B >= min_B && value.B <= Math.Abs(from.B - to.B) + min_B)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
