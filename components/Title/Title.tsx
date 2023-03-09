import { FunctionComponent, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title: FunctionComponent<TitleProps> = ({ children }) => {
  return (
    <h3 className="font-bold text-5xl mt-4 mb-8 text-white">{children}</h3>
  );
};
