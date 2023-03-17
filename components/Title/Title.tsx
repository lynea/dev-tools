import { FunctionComponent, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title: FunctionComponent<TitleProps> = ({ children }) => {
  return (
    <h3
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className="bg-gradient-to-r from-gradientStart to-gradientEnd block text-opacity-0 text-6xl  leading-relaxed font-bold bg-clip-text "
    >
      {children}
    </h3>
  );
};
