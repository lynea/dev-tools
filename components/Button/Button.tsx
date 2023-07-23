import { ReactNode, FunctionComponent } from 'react'

interface ButtonProps {
    variant: 'primary' | 'secondary'
    disabled?: boolean
    children: ReactNode
    onClick?: () => void
    className?: string
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    className,
    disabled,
    onClick,
}) => {
    return (
        <button
            className={`hover:bg-pink rounded bg-purple-800 px-10 py-3 font-bold text-white ${className} w-full lg:w-auto`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
