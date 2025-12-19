import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CuteTapWrapper({
  children,
  color = "pink",       // "pink" | "purple" | "blue"
  hint = "Tap to open 💖",
  className = "",
}) {
  const [opened, setOpened] = useState(false);

  const palette = {
    pink: {
      gradient: "bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400",
      border: "border-pink-300",
      text: "text-pink-700",
      heart: "💖",
    },
    purple: {
      gradient: "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400",
      border: "border-purple-300",
      text: "text-purple-700",
      heart: "💜",
    },
    blue: {
      gradient: "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400",
      border: "border-blue-300",
      text: "text-blue-700",
      heart: "💙",
    },
  }[color];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Revealed text (underneath) */}
      <div
        className={`px-4 py-3 rounded-2xl bg-white ${palette.border} border shadow-sm text-center relative`}
      >
        <span className={`font-medium ${palette.text}`}>{children}</span>

        {/* Emoji burst after unwrap */}
        {opened && (
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.5, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            💖✨🌸
          </motion.div>
        )}
      </div>

      {/* Wrapper layer (slides left and disappears on tap) */}
      <AnimatePresence>
        {!opened && (
          <motion.button
            type="button"
            onClick={() => setOpened(true)}
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }} // slides left and fades
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className={`absolute inset-0 ${palette.gradient} rounded-2xl shadow-lg
                       flex items-center justify-center gap-2 cursor-pointer
                       border ${palette.border} select-none`}
            style={{ backdropFilter: "blur(6px)" }}
          >
            <span className="text-xl">{palette.heart}</span>
            <span className="text-sm font-semibold">{hint}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
