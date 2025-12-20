import React, { useState } from "react";

export default function SpecialMoments() {
  const [selected, setSelected] = useState(null);

  // 60+ items add karne ke liye array bana lo
  const moments = [
    { type: "image", src: "/assets/us-photo1.jpg", caption: "Our first trip together 🌸" },
    { type: "video", src: "/assets/us-video1.mp4", caption: "Laughing endlessly 💕" },
    { type: "image", src: "/assets/chat-ss1.png", caption: "Cute midnight chats 🌙" },
    { type: "image", src: "/assets/us-photo2.jpg", caption: "Selfie time 😍" },
    // ... add up to 60+ items here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-600 drop-shadow-md">
        Our Special Moments 💖
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moments.map((moment, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(moment)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
          >
            {moment.type === "image" && (
              <img src={moment.src} alt={moment.caption} className="w-full h-64 object-cover" />
            )}
            {moment.type === "video" && (
              <video src={moment.src} className="w-full h-64 object-cover" muted />
            )}
            <div className="p-4 text-center text-sm font-medium text-gray-700">
              {moment.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full p-4">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:scale-110"
            >
              ✖
            </button>
            {selected.type === "image" && (
              <img src={selected.src} alt={selected.caption} className="w-full max-h-[80vh] object-contain rounded-lg" />
            )}
            {selected.type === "video" && (
              <video src={selected.src} controls autoPlay className="w-full max-h-[80vh] object-contain rounded-lg" />
            )}
            <p className="text-center text-pink-200 mt-4 text-lg">{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
