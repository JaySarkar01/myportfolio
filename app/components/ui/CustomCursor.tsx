"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use refs to avoid re-renders on every mouse move
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverEvents = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, select, .cursor-hover');
      
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
      
      return () => {
        hoverables.forEach((el) => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial attach
    const cleanupHovers = handleLinkHoverEvents();
    
    // Mutation observer to attach to dynamically added elements
    const observer = new MutationObserver(() => {
      cleanupHovers();
      handleLinkHoverEvents();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanupHovers();
      observer.disconnect();
    };
  }, [isVisible]);

  // Don't render cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) return null;

  const variants: Variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid rgba(0, 240, 255, 0)",
      transition: {
        type: "tween",
        ease: "backOut",
        duration: 0.1
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1,
      backgroundColor: "rgba(0, 240, 255, 0.1)",
      border: "1px solid rgba(0, 240, 255, 0.5)",
      backdropFilter: "blur(4px)",
      transition: {
        type: "spring",
        mass: 0.2,
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const ringVariants: Variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      opacity: 0.5,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 80,
        damping: 20
      }
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 0.5,
      opacity: 0,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 80,
        damping: 20
      }
    }
  };

  return (
    <>
      {/* Small dot that sticks directly to the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        style={{ 
          opacity: isVisible ? 1 : 0, 
          width: isHovering ? '48px' : '12px',
          height: isHovering ? '48px' : '12px',
        }}
      />
      
      {/* Outer ring that lags slightly behind */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border border-[var(--color-neon-primary)]/40 hidden md:block"
        variants={ringVariants}
        animate={isHovering ? "hover" : "default"}
        style={{ opacity: isVisible && !isHovering ? 0.5 : 0 }}
      />
    </>
  );
};
