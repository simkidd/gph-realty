// components/ui-custom/ChipInput.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui-custom/Input";
import { Chip } from "./Chip";

interface ChipInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}

export const ChipInput = ({
  label,
  value,
  onChange,
  placeholder,
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAdd();
    }
  };

  return (
    <div className="">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-1">
        {value.map((item) => (
          <Chip key={item} onRemove={() => handleRemove(item)} >
            {item}
          </Chip>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown} // Handle Enter key
      />
    </div>
  );
};