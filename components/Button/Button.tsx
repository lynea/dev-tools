import { ReactNode, FunctionComponent } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`bg-purple-100 px-10 py-2 rounded font-bold text-white hover:bg-pink ${className} w-full lg:w-auto`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
