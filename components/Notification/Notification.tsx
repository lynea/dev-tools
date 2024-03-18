import { FunctionComponent, ReactNode } from 'react'

type NotificationProps = {
    children: ReactNode
}

export const Alert: FunctionComponent<NotificationProps> = ({ children }) => (
    <div className="rounded-md bg-red p-4 text-foreground ">{children}</div>
)
