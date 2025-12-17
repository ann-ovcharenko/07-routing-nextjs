"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from 'next/navigation'; 
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back(); 
    } else {
      router.push('/notes/filter/all'); 
    }
  }, [router]); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]); 

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal} ref={modalRef} role="dialog" aria-modal="true">
        <button 
          type="button" 
          className={css.closeButton} 
          onClick={close}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;