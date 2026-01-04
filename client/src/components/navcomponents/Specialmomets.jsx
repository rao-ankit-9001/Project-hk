import React, { useState, useEffect, useRef } from "react";

export default function SpecialMoments() {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);
  const pauseRef = useRef(false);

  // 60+ items add karne ke liye array bana lo
  const moments = [
    { type: "image", src: "https://drive.google.com/uc?id=12LBsJfImfVEu6yzUh_-Yrb7Ynha6i77x", caption: "Our first trip together 🌸" },
    { type: "video", src: "/assets/us-video1.mp4", caption: "Laughing endlessly 💕" },
    { type: "image", src: "/assets/chat-ss1.png", caption: "Cute midnight chats 🌙" },
    { type: "image", src: "/assets/us-photo2.jpg", caption: "Selfie time 😍" },
    // ... add up to 60+ items here
  ];

  // only image moments for carousel
  const images = moments.filter((m) => m.type === "image");

  // autoplay every 2 seconds
  useEffect(() => {
    if (!images.length) return;
    autoplayRef.current = setInterval(() => {
      if (pauseRef.current) return;
      setCurrent((c) => (c + 1) % images.length);
    }, 2000);
    return () => clearInterval(autoplayRef.current);
  }, [images.length]);

  // when modal opens, hide the global nav by adding body class
  useEffect(() => {
    if (selected) document.body.classList.add('whatsapp-fullscreen');
    else document.body.classList.remove('whatsapp-fullscreen');
    return () => document.body.classList.remove('whatsapp-fullscreen');
  }, [selected]);

  const goPrev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const goNext = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-600 drop-shadow-md">
        Our Special Moments 💖
      </h1>

      {/* Carousel */}
      <div className="max-w-3xl mx-auto mb-8">
        <div
          className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
          onMouseEnter={() => (pauseRef.current = true)}
          onMouseLeave={() => (pauseRef.current = false)}
        >
          <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-black">
            {images.length ? (
              <img
                src={images[current].src}
                alt={images[current].caption}
                className="max-h-full w-auto object-contain cursor-pointer"
                style={{ maxHeight: '80vh' }}
                onClick={() => setSelected({ ...images[current] })}
              />
            ) : (
              <div className="text-center p-8 text-gray-500">No images yet</div>
            )}
          </div>

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/45"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/45"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grid (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moments.map((moment, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(moment)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
          >
            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
              {moment.type === "image" && (
                <img src={moment.src} alt={moment.caption} className="max-h-full w-auto object-contain" />
              )}
              {moment.type === "video" && (
                <video src={moment.src} className="max-h-full w-auto object-contain" muted />
              )}
            </div>
            <div className="p-3 text-center text-sm font-medium text-gray-700">
              {moment.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:scale-110 z-30"
            >
              ✖
            </button>
            {selected.type === "image" && (
              <img src={selected.src} alt={selected.caption} className="w-full max-h-[80vh] object-contain rounded-lg" />
            )}
            {selected.type === "video" && (
              <video src={selected.src} controls autoPlay className="w-full max-h-[80vh] object-contain rounded-lg" />
            )}
            <div className="mt-4 bg-black/30 rounded-b-lg py-3 px-4 text-center">
              <p className="text-white text-lg">{selected.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
