import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  width?: number | string;
  maxWidth?: number | string;
  className?: string;
  closeOnBackdrop?: boolean;
  escapeToClose?: boolean;
  lockScroll?: boolean;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  width = 920,
  maxWidth = "95vw",
  className = "",
  closeOnBackdrop = true,
  escapeToClose = true,
  lockScroll = true,
  children,
  initialFocusRef,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Đóng popup khi click ra ngoài
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        closeOnBackdrop &&
        overlayRef.current &&
        e.target === overlayRef.current
      ) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  // Thêm event listener khi mở popup
  useEffect(() => {
    if (open && closeOnBackdrop) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, closeOnBackdrop, handleClickOutside]);

  // Store the last active element before opening
  useEffect(() => {
    if (open) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && escapeToClose) {
        onClose();
      }
    },
    [open, escapeToClose, onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open || !lockScroll) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, lockScroll]);

  // Focus management
  useEffect(() => {
    if (!open) {
      // Restore focus to the last active element when closing
      lastActiveElement.current?.focus();
      return;
    }

    // Focus the initial focus element if provided
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
      return;
    }

    // Otherwise, find the first focusable element
    const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements?.length) {
      focusableElements[0].focus();
    }
  }, [open, initialFocusRef]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Overlay - sẽ bắt sự kiện click ra ngoài */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-black/40"
        role="presentation"
        onClick={() => {
          if (closeOnBackdrop) onClose();
        }}
      />
      
      {/* Nội dung popup */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        ref={panelRef}
        className={className}
        style={{ width, maxWidth }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
    </>,
    document.body
  );
};

export default Popup;