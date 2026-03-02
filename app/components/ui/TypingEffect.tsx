"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 80;
    const fullText = texts[currentTextIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        // Pause at end of text
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const nextText = isDeleting 
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, texts]);

  return (
    <span className="inline-block min-w-[300px] text-left">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block ml-1 w-1 h-5 md:h-6 bg-[var(--color-neon-primary)]"
      />
    </span>
  );
};
