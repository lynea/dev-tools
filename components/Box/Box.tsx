import { FunctionComponent, ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
};

export const Box: FunctionComponent<BoxProps> = ({ children }) => {
  return (
    <div className="p-4 bg-purple-100  text-white rounded">{children}</div>
  );
};
