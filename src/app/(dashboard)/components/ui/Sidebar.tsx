"use client";
import Button, { ButtonProps } from "@/components/ui-custom/Button";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import {
  ButtonHTMLAttributes,
  createContext,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
    }
  }, [isMobile]);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile || !openMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, openMobile]);

  const contextValue = useMemo<SidebarContextType>(
    () => ({
      isOpen,
      setIsOpen,
      toggleSidebar,
      isMobile,
      openMobile,
      setOpenMobile,
    }),
    [isOpen, toggleSidebar, isMobile, openMobile]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} ref={ref} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <div
          className={`fixed inset-0 z-50 flex ${
            openMobile ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
              openMobile ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpenMobile(false)}
          ></div>

          {/* Sidebar */}
          <div
            ref={ref}
            className={cn(
              `relative z-50 h-full w-64 border-r shadow-lg bg-white transition-transform duration-300 ease-in-out ${
                openMobile ? "translate-x-0" : "-translate-x-full"
              }`,
              className
            )}
            {...props}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className="hidden md:block">
        <div
          className={cn(
            "fixed inset-y-0 left-0 h-svh z-10 w-64 bg-white border-r ",
            className
          )}
          {...props}
        >
          <div className="flex h-full w-full flex-col ">{children}</div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

// Sidebar Header
export const SidebarHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  >
    {children}
  </div>
));

SidebarHeader.displayName = "SidebarHeader";

// Sidebar Menu
export const SidebarMenu = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  >
    {children}
  </ul>
));

SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Item
export const SidebarMenuItem = forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props}>
    {children}
  </li>
));

SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Content
export const SidebarContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto", className)}
    {...props}
  >
    {children}
  </div>
));

SidebarContent.displayName = "SidebarContent";

// Sidebar Footer
export const SidebarFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 border-t", className)} {...props}>
    {children}
  </div>
));

SidebarFooter.displayName = "SidebarFooter";

// Sidebar Separator
export const SidebarSeparator = forwardRef<
  HTMLHRElement,
  HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn("my-2 border-t", className)} {...props} />
));

SidebarSeparator.displayName = "SidebarSeparator";

// Sidebar Toggle Button
export const SidebarTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        size={"icon"}
        variant={"outline"}
        className={cn("h-8 w-8", className)}
        aria-label="Toggle Sidebar"
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  }
);

SidebarTrigger.displayName = "SidebarTrigger";

// Sidebar Menu Button
export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean;
  }
>(({ isActive = false, className, children, onClick, ...props }, ref) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Call any onClick prop passed in.
    if (onClick) onClick(e);
    // On mobile, close the sidebar.
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <button
      ref={ref}
      data-active={isActive}
      className={cn(
        "w-full text-left text-sm flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors outline-none focus:ring-2 focus:ring-primary data-[active=true]:bg-primary/50 hover:bg-primary/10 [&>svg]:size-4 [&>svg]:shrink-0 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

SidebarMenuButton.displayName = "SidebarMenuButton";
