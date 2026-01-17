import gsap from "gsap";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { isMobile } from "../utils/mobileDetection";

const Modal = ({ isOpen, onClose, children, setShouldRender, transparent }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setShouldRender(false); // finally unmount
        },
      });
    }
  }, [isOpen, setShouldRender]);

  return createPortal(
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing
        style={{
          background: transparent ? "transparent" : "#fff",
          overflow: "hidden",
          padding: "2px",
          borderRadius: "1rem",
          minWidth: isMobile() ? "85vw" : "50vw",
          minHeight: "10vh",
          textAlign: "center",
          display: "flex",
        }}
      >
        {children}
        {/* <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Close
        </button> */}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
