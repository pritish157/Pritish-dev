"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "./dialog";

/**
 * Tooltip Component — Accessible tooltip trigger and content bubble.
 */
export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export function Tooltip({ content, children, position = "top", className }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2"
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {React.cloneElement(children, {
        "aria-describedby": isOpen ? "tooltip-content" : undefined
      } as React.HTMLAttributes<HTMLElement>)}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="tooltip-content"
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900/95 px-3 py-1.5 text-xs text-slate-200 shadow-xl backdrop-blur-md select-none pointer-events-none",
              positionClasses[position],
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Popover Component — Click-to-open overlay popover surface.
 */
export type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};

export function Popover({ trigger, children, align = "center", className }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full mt-2 z-50 min-w-[200px] rounded-2xl border border-white/15 bg-slate-900/95 p-4 text-sm text-slate-200 shadow-2xl backdrop-blur-2xl",
              alignClasses[align],
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Drawer Component — Slide-over side sheet panel for mobile overlays or settings.
 */
export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "bottom";
  children: React.ReactNode;
};

export function Drawer({ isOpen, onClose, title, side = "right", children }: DrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const slideVariants = {
    right: { hidden: { x: "100%" }, visible: { x: 0 } },
    bottom: { hidden: { y: "100%" }, visible: { y: 0 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          {/* Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants[side]}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className={cn(
              "relative z-10 flex flex-col bg-slate-950/95 border-white/10 p-6 shadow-2xl backdrop-blur-2xl text-white",
              side === "right"
                ? "ml-auto h-full w-full max-w-md border-l"
                : "mt-auto w-full max-h-[85vh] rounded-t-3xl border-t"
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              {title && <h3 className="text-lg font-semibold font-display">{title}</h3>}
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Accordion Component — Collapsible accordion container and item.
 */
export type AccordionItemProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function AccordionItem({ title, children, isOpen = false, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left text-base font-medium text-slate-200 hover:text-white transition-colors"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-sm text-slate-400 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Tabs Component — Accessible tab switcher with animated active pill indicator.
 */
export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
};

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id || "");

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("space-y-6 w-full", className)}>
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors select-none",
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 rounded-xl bg-violet-500/20 border border-violet-500/40 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {tab.icon && <span className="relative z-10">{tab.icon}</span>}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div>{activeContent}</div>
    </div>
  );
}

/**
 * Collapse Component — Simple expandable/collapsible container.
 */
export type CollapseProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export function Collapse({ isOpen, children }: CollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ContextMenu Component — Custom right-click context menu wrapper.
 */
export type ContextMenuProps = {
  menuItems: { label: string; action: () => void; icon?: React.ReactNode }[];
  children: React.ReactNode;
};

export function ContextMenu({ menuItems, children }: ContextMenuProps) {
  const [coords, setCoords] = React.useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    const closeMenu = () => setCoords(null);
    if (coords) document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [coords]);

  return (
    <div onContextMenu={handleContextMenu} className="relative">
      {children}
      <AnimatePresence>
        {coords && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ top: coords.y, left: coords.x }}
            className="fixed z-50 min-w-[160px] rounded-xl border border-white/15 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-2xl text-xs text-slate-200"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setCoords(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-violet-500/20 hover:text-white transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
