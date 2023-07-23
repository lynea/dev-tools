import { FunctionComponent, ReactNode } from 'react'
import styles from './Box.module.scss'

type BoxProps = {
    children: ReactNode
}

export const Box: FunctionComponent<BoxProps> = ({ children }) => {
    return (
        <div
            className={`${styles.box} " [&_img]:max-w-sm" w-full  rounded bg-main-100 p-4  text-white`}
        >
            {children}
        </div>
    )
}
