import React from "react";
import { cn } from "@/lib/utils"; // Assuming `cn` is your utility function for combining classNames
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex items-center px-3 py-1 text-sm font-medium rounded-full",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-800",
        success: "bg-green-200 text-green-800",
        warning: "bg-yellow-200 text-yellow-800",
        error: "bg-red-200 text-red-800",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
