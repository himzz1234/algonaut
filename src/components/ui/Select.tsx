import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  children: (props: { toggle: () => void; isOpen: boolean }) => ReactNode;
  placeholder?: string;
  placement?: "top" | "bottom";
  align?: "left" | "right";
}

export default function Select({
  options,
  onSelect,
  children,
  placement,
  align = "left",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!document.getElementById("dropdown-portal")) {
      const el = document.createElement("div");
      el.id = "dropdown-portal";
      document.body.appendChild(el);
    }
  }, []);

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

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let finalPlacement: "top" | "bottom" = placement ?? "bottom";
      if (!placement) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceAbove > spaceBelow) finalPlacement = "top";
      }

      const top =
        finalPlacement === "bottom"
          ? rect.bottom + window.scrollY + 8
          : rect.top - dropdownRect.height + window.scrollY - 8;

      let left = rect.left + window.scrollX;

      if (align === "right") {
        left = rect.right + window.scrollX - dropdownRect.width;
      }

      setCoords({
        top,
        left,
        width: rect.width,
      });
    }
  }, [isOpen, placement, align]);

  const dropdownMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={dropdownRef}
          role="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bg-[#100f14]
            border border-gray-700/60 rounded-md shadow-lg 
            max-h-64 overflow-y-auto z-[9999] min-w-48 no-scrollbar"
          style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
          }}
        >
          {options.map((option) => (
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
              className="px-4 py-2 capitalize text-white/90 hover:text-white 
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
