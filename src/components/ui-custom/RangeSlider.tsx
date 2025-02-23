"use state";
import React, { useCallback, useEffect, useRef } from "react";

interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const RangeSlider: React.FC<SliderProps> = ({
  label,
  max,
  min,
  onChange,
  value,
}) => {
  const range = useRef<HTMLDivElement>(null);
  const [minValue, maxValue] = value;

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Update range slider track width
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(maxValue);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, getPercent]);

  return (
    <div>
      <label className="mb-4 text-[#878787] text-sm inline-block">
        {label}:
      </label>{" "}
      <input
        type="text"
        value={`${minValue} - ${maxValue}`}
        className="text-[#878787] text-sm"
        readOnly
      />
      <div
        className={
          "h-[5px] bg-neutral-300 rounded-[3px] flex items-center justify-center relative"
        }
      >
        {/* Selected Range */}
        <div
          ref={range}
          className="absolute z-[1] block top-0 h-full rounded-[3px] bg-primary"
        />

        {/* Left Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxValue - 1);
            onChange([value, maxValue]);
          }}
          className="thumb"
        />

        {/* Right Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minValue + 1);
            onChange([minValue, value]);
          }}
          className="thumb"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
