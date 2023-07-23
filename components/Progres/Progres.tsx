import { FunctionComponent } from 'react'

interface ProgressBarProps {
    max: number
    value: number
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
    max,
    value,
}) => {
    return (
        <>
            <div
                className="order-1 h-4 w-full overflow-hidden bg-main-100 lg:order-2"
                data-cy="progres"
            >
                <div
                    style={{ width: `${(value / max) * 100}%` }}
                    className={`h-4 bg-pink-500 transition-all duration-200 ease-in `}
                    data-cy="progres-inner"
                ></div>
            </div>
        </>
    )
}
