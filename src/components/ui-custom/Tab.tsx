"use client";
import React, { useState, createContext, useContext, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Context for managing active tab state
interface TabContextProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a Tabs component");
  }
  return context;
};

// TabNav Component
const tabNavVariants = cva(
  "px-4 py-3 text-sm font-medium focus:outline-none outline-none transition-all uppercase font-semibold w-full",
  {
    variants: {
      variant: {
        default:
          "text-gray-700 hover:text-gray-900 border-b-2 border-transparent",
        active: "text-primary border-primary border-b-2",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-4 py-3",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface TabNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabNavVariants> {
  tabKey: string;
}

const TabNav = forwardRef<HTMLButtonElement, TabNavProps>(
  ({ tabKey, className, variant, size, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabContext();
    const isActive = activeTab === tabKey;

    return (
      <li>
        <button
          ref={ref}
          className={cn(
            tabNavVariants({ variant: isActive ? "active" : variant, size }),
            className
          )}
          onClick={() => setActiveTab(tabKey)}
          {...props}
        />
      </li>
    );
  }
);

TabNav.displayName = "TabNav";

// TabContent Component
interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  tabKey: string;
}

const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ tabKey, className, ...props }, ref) => {
    const { activeTab } = useTabContext();
    return (
      <div
        ref={ref}
        className={cn(
          "p-4",
          activeTab === tabKey ? "block" : "hidden",
          className
        )}
        {...props}
      />
    );
  }
);

TabContent.displayName = "TabContent";

// Main Tabs Component
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultActiveTabKey?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultActiveTabKey = "", ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTabKey);

    return (
      <TabContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} {...props} />
      </TabContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// Exporting all components under Tabs object
export { Tabs, TabNav, TabContent };
