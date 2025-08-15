import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  width?: number | string;
  maxWidth?: number | string;
  className?: string;
  closeOnBackdrop?: boolean;
  escapeToClose?: boolean;
  lockScroll?: boolean;
  children: React.ReactNode;
};

export default function Popup({
  open,
  onClose,
  width = 920,
  maxWidth = "95vw",
  className = "",
  closeOnBackdrop = true,
  escapeToClose = true,
  lockScroll = true,
  children,
}: PopupProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Đóng bằng ESC
  useEffect(() => {
    if (!open || !escapeToClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, escapeToClose, onClose]);

  // Khóa scroll nền khi mở
  useEffect(() => {
    if (!open || !lockScroll) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open, lockScroll]);

  // Focus phần tử có thể focus đầu tiên bên trong
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current?.querySelector<HTMLElement>(
      'input, button, [tabindex="0"], textarea, select, a[href]'
    );
    el?.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Overlay mờ */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40"
        onMouseDown={() => closeOnBackdrop && onClose()}
      />
      {/* Panel căn giữa */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          // KHÔNG thêm padding/bo góc mặc định để giữ nguyên layout của LoginPage;
          // bạn tự điều khiển bằng className truyền vào.
          className={className}
          style={{ width, maxWidth }}
          onMouseDown={(e) => e.stopPropagation()} // tránh click xuyên đóng popup
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
