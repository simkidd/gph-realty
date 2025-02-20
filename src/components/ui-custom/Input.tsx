// components/ui-custom/Input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md font-medium transition-colors     placeholder:text-muted-foreground focus:outline-none focus:ring-1   disabled:cursor-not-allowed disabled:opacity-50 focus:ring-primary ",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-gray-200",
        filled: "bg-muted text-foreground border border-transparent ",
        outline: "bg-transparent text-foreground border border-gray-200 ",
        ghost: "bg-transparent text-foreground border border-transparent  ",
      },
      inputSize: {
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

// Define the InputProps interface
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
