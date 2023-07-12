import { FunctionComponent } from "react";

interface ProgressBarProps {
  max: number;
  value: number;
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  max,
  value,
}) => {
  return (
    <>
      <div
        className="bg-main-100 w-full h-4 overflow-hidden order-1 lg:order-2"
        data-cy="progres"
      >
        <div
          style={{ width: `${(value / max) * 100}%` }}
          className={`h-4 bg-pink-500 transition-all duration-200 ease-in `}
          data-cy="progres-inner"
        ></div>
      </div>
    </>
  );
};
