import { motion, AnimatePresence } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  useEffect(() => {
    if (modalContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalContent]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalContent && (
          <>
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 z-[9999] backdrop-blur-sm bg-gradient-to-b from-[#d5ecff]/50 to-[#e9f4ff]/50 dark:from-[#051428]/70 dark:to-[#10223a]/70"
            />

            <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
              <motion.div
                className="relative w-[90%] max-w-2xl h-fit"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/60 dark:bg-[#141d2c]/80 backdrop-blur-xl text-[#264D73] px-4 sm:px-8 py-6 sm:py-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/40 pointer-events-auto"
                >
                  {modalContent}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
