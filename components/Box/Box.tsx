import { FunctionComponent, ReactNode } from 'react'
import styles from './Box.module.scss'

type BoxProps = {
    children: ReactNode
}

export const Box: FunctionComponent<BoxProps> = ({ children }) => {
    return (
        <div
            className={`${styles.box} " [&_img]:max-w-sm" w-full rounded  bg-slate-50 p-4 text-foreground drop-shadow-lg  dark:bg-main-100`}
        >
            {children}
        </div>
    )
}
