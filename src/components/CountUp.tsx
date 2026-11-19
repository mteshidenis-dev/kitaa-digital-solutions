import { parseStat, useCountUp } from "@/hooks/use-count-up";

/**
 * Animated counter that counts up from 0 once it enters the viewport.
 * Pass the original stat string, e.g. "50+", "98%", "100%".
 * `className` is forwarded to the wrapping <span>.
 */
const CountUp = ({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) => {
  const { end, suffix } = parseStat(value);
  const isNumeric = /^\d+[+%]?$/.test(value);
  const { ref, count } = useCountUp(isNumeric ? end : 0, duration);
  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
