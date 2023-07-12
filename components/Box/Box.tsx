import { FunctionComponent, ReactNode } from "react";
import styles from "./Box.module.scss";

type BoxProps = {
  children: ReactNode;
};

export const Box: FunctionComponent<BoxProps> = ({ children }) => {
  return (
    <div
      className={`${styles.box} " bg-main-100 p-4  w-full text-white rounded  [&_img]:max-w-sm"`}
    >
      {children}
    </div>
  );
};
