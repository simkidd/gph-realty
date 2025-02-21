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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, inputSize, prefix, suffix, containerClass, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative", containerClass)}>
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ variant, inputSize }),
            className,
            prefix ? "pl-8" : "",
            suffix ? "pr-8" : ""
          )}
          style={{
            paddingLeft: prefix ? "2rem" : undefined,
            paddingRight: suffix ? "2rem" : undefined,
          }}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
