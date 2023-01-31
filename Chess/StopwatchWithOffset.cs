using System;
using System.Diagnostics;

namespace Chess
{
    public class StopwatchWithOffset : Stopwatch
    {
        private TimeSpan offset;

        public StopwatchWithOffset()
        { }

        public StopwatchWithOffset(TimeSpan offset)
        {
            this.offset = offset;
        }

        public new TimeSpan Elapsed
        {
            get
            {
                return base.Elapsed + offset;
            }
            set
            {
                offset = value;
            }
        }

        public new long ElapsedMilliseconds => base.ElapsedMilliseconds + offset.Milliseconds;

        public new long ElapsedTicks => base.ElapsedTicks + offset.Ticks;
    }
}
