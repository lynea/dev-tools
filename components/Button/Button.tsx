import { ReactNode, FunctionComponent } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="bg-purple-100 px-10 py-2 rounded font-bold text-white hover:bg-pink "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
