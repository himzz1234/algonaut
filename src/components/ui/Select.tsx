import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  children: (props: { toggle: () => void; isOpen: boolean }) => ReactNode;
  placeholder?: string;
  placement?: "top" | "bottom";
}

export default function Dropdown({
  options,
  onSelect,
  children,
  placement,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Ensure portal exists
  useEffect(() => {
    if (!document.getElementById("dropdown-portal")) {
      const el = document.createElement("div");
      el.id = "dropdown-portal";
      document.body.appendChild(el);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle positioning
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      let finalPlacement: "top" | "bottom" = placement ?? "bottom";
      if (!placement) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceAbove > spaceBelow) finalPlacement = "top";
      }

      setCoords({
        top:
          finalPlacement === "bottom"
            ? rect.bottom + window.scrollY + 8
            : rect.top + window.scrollY - 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, placement]);

  const dropdownMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={dropdownRef}
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="absolute bg-white/5 dark:bg-black/30 backdrop-blur-md 
            border border-white/10 rounded-md shadow-lg 
            max-h-60 overflow-y-auto z-[9999]"
          style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
          }}
        >
          {options.map((option, index) => (
            <li
              key={option}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSelect(option);
                  setIsOpen(false);
                } else if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              className="px-4 py-2 text-white/90 hover:text-white 
                hover:bg-green-500/40 transition-all duration-200 cursor-pointer outline-none"
            >
              {option}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative inline-block h-full w-full" ref={triggerRef}>
      {children({ toggle: () => setIsOpen((p) => !p), isOpen })}
      {createPortal(dropdownMenu, document.getElementById("dropdown-portal")!)}
    </div>
  );
}
