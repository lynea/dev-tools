import { FunctionComponent, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  size?: "l" | "xl";
};

export const Title: FunctionComponent<TitleProps> = ({
  children,
  size = "l",
}) => {
  return (
    <h3
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className={`bg-gradient-to-r from-gradientStart to-gradientEnd block text-opacity-0 text-${
        size === "l" ? "6xl" : "6xl"
      }  leading-relaxed font-bold bg-clip-text `}
    >
      {children}
    </h3>
  );
};
