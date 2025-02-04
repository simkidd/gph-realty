import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Define card variants using cva
const cardVariants = cva(
  "rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200", // Base styles for the card
  {
    variants: {
      variant: {
        default: "bg-white text-gray-800", // Default variant (light background)
        outlined: "border-gray-300 text-gray-800", // Outlined variant (bordered card)
        elevated: "bg-white text-gray-800 shadow-xl", // Elevated variant with more shadow
      },
    },
    defaultVariants: {
      variant: "default", // Default variant is normal
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;
