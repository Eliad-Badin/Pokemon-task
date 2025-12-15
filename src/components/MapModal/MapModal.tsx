import { useEffect } from "react";
import "./MapModal.css";

interface MapModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MapModal({ isOpen, title, onClose, children }: MapModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
