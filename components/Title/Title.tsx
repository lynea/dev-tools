import { FunctionComponent, ReactNode } from 'react'

type TitleProps = {
    children: ReactNode
    size?: 'l' | 'xl'
}

export const Title: FunctionComponent<TitleProps> = ({
    children,
    size = 'l',
}) => {
    return (
        <h3
            style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            className={`block bg-gradient-to-r from-gradientStart to-gradientEnd text-opacity-0 text-${
                size === 'l' ? '5xl' : '5xl'
            }  bg-clip-text font-bold leading-relaxed `}
        >
            {children}
        </h3>
    )
}
