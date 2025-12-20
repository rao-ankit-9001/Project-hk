import { useState } from "react";
import { motion } from "framer-motion";
import bubu from "../assets/bubu.png";
function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const handleTeddyClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000); // Auto close after 5 seconds
  };

  const hearts = Array.from({ length: 12 });
  const emojis = ["💖", "💕", "💞", "💓","🤞","🌹","💑","💝"];

  return (
    <>
      {/* Rest of the sections */}
      <div className="container mx-auto px-4">
        {/* Add the rest of your sections here */}
      </div>

      {/* Teddy + Popup wrapper */}
      <div className="teddy fixed bottom-5 right-5 z-20">
        {/* Teddy bear */}
        <div
          className="text-5xl filter drop-shadow-lg animate-bounce cursor-pointer"
          onClick={handleTeddyClick}
        >
        <img src={bubu} alt="bubu" width={70}/>
        </div>

        {/* Popup and Floating Emojis */}
        {showPopup && (
          <div className="absolute bottom-full right-0 flex flex-col items-center">
            {/* Popup Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 bg-pink-100 text-pink-800 rounded-lg shadow-lg px-4 py-2 font-bold text-sm flex items-center gap-2 w-45"
            >
              I LOVE U Mumma ❤️
            </motion.div>

            {/* Emoji Burst */}
            {hearts.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: -80 - Math.random() * 120,   // float upwards
                  x: (Math.random() - 0.5) * 100, // random left/right
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="absolute"
                style={{
                  fontSize: `${20 + Math.random() * 20}px`,
                  bottom: "0", // start from teddy top
                  right: "0",
                }}
              >
                {emojis[Math.floor(Math.random() * emojis.length)]}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer text-center text-gray-500 py-6">
        Banaya pyaar se — Rao
      </div>
    </>
  );
}

export default Footer;
