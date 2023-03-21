import { ReactNode, FunctionComponent } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-purple-100 px-10 py-2 rounded font-bold text-white hover:bg-pink ">
      {children}
    </button>
  );
};
