import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  children: (props: { toggle: () => void; isOpen: boolean }) => ReactNode; // custom trigger
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
        left: rect.right + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, placement]);

  const dropdownMenu = (
    <ul
      ref={dropdownRef}
      className="min-w-60 dropdown-menu absolute bg-white/5 dark:bg-black/30 backdrop-blur-md
      border border-white/10 rounded-md shadow-lg 
      max-h-60 overflow-y-auto animate-fadeIn"
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        position: "absolute",
        zIndex: 9999,
        transform: `translateX(-100%) ${
          placement === "top" ? "translateY(-100%)" : "translateY(0)"
        }`,
      }}
    >
      {options.map((option) => (
        <li
          key={option}
          onClick={() => {
            onSelect(option);
            setIsOpen(false);
          }}
          className="px-4 py-2 text-white/90 hover:text-white 
          hover:bg-indigo-500/40 transition-all duration-200 cursor-pointer"
        >
          {option}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative inline-block h-full w-full" ref={triggerRef}>
      {children({ toggle: () => setIsOpen((p) => !p), isOpen })}

      {isOpen &&
        createPortal(dropdownMenu, document.getElementById("dropdown-portal")!)}
    </div>
  );
}
