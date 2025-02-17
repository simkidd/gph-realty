import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import Badge from "../ui/Badge";

type Status = 
  | "development"
  | "construction"
  | "completed"
  | "on-sale"
  | "rent"
  | "sold";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

// Function to remove hyphens and format text
const formatStatus = (status: string) => status.replace(/-/g, " ");

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    development: "bg-blue-500 text-white",
    construction: "bg-yellow-500 text-gray-800",
    completed: "bg-purple-500 text-white",
    'on-sale': "bg-green-500 text-white",
    rent: "bg-orange-500 text-white",
    sold: "bg-red-500 text-white",
  };

  return (
    <Badge
      className={cn(
        "rounded-md capitalize",
        statusStyles[status],
        className
      )}
      size="sm"
    >
      {formatStatus(status)}
    </Badge>
  );
};