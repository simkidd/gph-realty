import { XIcon } from "lucide-react";

interface ChipProps {
  children: React.ReactNode;
  onRemove: () => void;
}

export const Chip = ({ children, onRemove }: ChipProps) => {
  return (
    <div className="inline-flex items-center bg-primary/30 text-primary text-sm font-medium px-3 py-1 rounded-full">
      <span>{children}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-primary hover:text-primary focus:outline-none"
      >
        <XIcon size={16} />
      </button>
    </div>
  );
};