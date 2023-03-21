import { FunctionComponent, ReactNode } from "react";

type NotificationProps = {
  children: ReactNode;
};

export const Alert: FunctionComponent<NotificationProps> = ({ children }) => (
  <div className="bg-red text-white rounded-md p-4 ">{children}</div>
);
