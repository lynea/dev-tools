import { FunctionComponent } from 'react'
import { SquareButtonProps } from './types'
import clsx from 'clsx'

export const SqaureButton: FunctionComponent<SquareButtonProps> = ({
    children,
    onClick,
    disabled,
    active,
    className,
    ...otherProps
}) => {
    return (
        <button
            {...otherProps}
            onClick={onClick}
            disabled={disabled}
            className={`${clsx(
                ' h-40  w-40 rounded-md  border-2 text-xl font-bold transition-all duration-200 ease-in',
                {
                    'bg-gradient-to-t from-gradientEnd to-gradientStart text-main-200  ':
                        active && !disabled,
                    'border-pink text-main-200 dark:text-white':
                        !active && !disabled,
                    'cursor-not-allowed border-gray-500 text-gray-500':
                        disabled,
                }
            )}  ${className}`}
        >
            {children}
        </button>
    )
}
