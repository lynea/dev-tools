import { FunctionComponent, ReactNode } from "react";
import styles from "./Box.module.scss";

type BoxProps = {
  children: ReactNode;
};

export const Box: FunctionComponent<BoxProps> = ({ children }) => {
  return (
    // <div className="p-4 bg-purple-100  w-full text-white rounded [&_li]:mt-4 [&_a]:font-bold [&_img]:max-w-sm">
    <div
      className={`${styles.box} " bg-purple-100 p-4  w-full text-white rounded  [&_img]:max-w-sm"`}
    >
      {children}
    </div>
  );
};
