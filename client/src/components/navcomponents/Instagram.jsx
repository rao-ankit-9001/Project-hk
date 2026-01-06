import { useState, useEffect } from "react";

export default function InstagramChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ✅ Yahan tum apna Buddhudi.txt parse kar sakte ho
    // Abhi demo ke liye static messages
    setMessages([
      { from: "her", text: "Heyy 😘", time: "04:10 PM" },
      { from: "me", text: "Hi cutie 💫", time: "04:11 PM" },
      { from: "her", text: "Miss you so much 💕", time: "04:12 PM" },
      { from: "me", text: "Miss to m bhi bhot karta hu 🥺", time: "04:13 PM" },
      { from: "her", text: "Call me later 📞", time: "04:15 PM" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-indigo-50 flex items-center justify-center p-3">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-pink-100 px-4 py-3 flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595297/IMG_20240227_122831_669_w24rnw.jpg"
            alt="Buddhudi"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="font-semibold leading-tight">Buddhudi 💕</div>
            <div className="text-xs text-gray-500">Active now</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-pink-100">📞</button>
            <button className="p-2 rounded-full hover:bg-pink-100">📹</button>
            <button className="p-2 rounded-full hover:bg-pink-100">⋮</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 relative">
          {messages.map((m, i) => {
            const isMe = m.from === "me";
            return (
              <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm
                    ${isMe
                      ? "bg-linear-to-br from-indigo-100 to-purple-100 text-gray-800"
                      : "bg-linear-to-br from-pink-100 to-rose-100 text-gray-800"}`}
                >
                  <p className="whitespace-pre-wrap break-word">{m.text}</p>
                  <div className="text-[10px] text-gray-500 mt-1 text-right">{m.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
