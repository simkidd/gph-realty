import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import Badge from "../ui-custom/Badge";

type Status = "available" | "unavailable";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const label = status === "available" ? "For Sale" : "Sold";
  const statusStyle =
    status === "available"
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white";

  return (
    <Badge
      className={cn("rounded-md capitalize", statusStyle, className)}
      size="sm"
    >
      {label}
    </Badge>
  );
};
