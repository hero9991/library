import s from "./Spinner.module.css";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "#1c1c1c",
}) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const dotSize = sizeMap[size] / 4;
  const containerSize = sizeMap[size];

  return (
    <div
      className={s.spinnerContainer}
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
      <div
        className={s.dot}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          animationDelay: "0s",
        }}
      />
      <div
        className={s.dot}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          animationDelay: "0.15s",
        }}
      />
      <div
        className={s.dot}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          animationDelay: "0.3s",
        }}
      />
    </div>
  );
};
