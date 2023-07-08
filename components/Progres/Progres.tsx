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
        className="bg-purple-100 w-full h-4 overflow-hidden order-1 lg:order-2"
        data-cy="progres"
      >
        <div
          style={{ width: `${(value / max) * 100}%` }}
          className={`h-4 bg-pink `}
          data-cy="progres-inner"
        ></div>
      </div>
    </>
  );
};
