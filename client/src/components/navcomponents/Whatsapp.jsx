import { useState, useEffect, useRef } from "react";
import whatsappbg from "../../assets/whatsappbg.jpg";

export default function Whatsapp() {
  const [messages, setMessages] = useState([]); // displayed messages
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevNavDisplayRef = useRef(null);
  const prevMainPaddingRef = useRef(null);

  // Load initial batch of messages
  useEffect(() => {
    // helper to parse raw lines into message objects
    const parseLines = (lines) => {
      return (lines || [])
        .map((line) => {
          const match = line.match(/(\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2}\s?[ap]m)\s*-\s*([^:]+):\s*(.+)/i);
          if (match) {
            const [, , time, sender, text] = match;
            return {
              sender: sender.trim() === "Rao_ankit" ? "me" : "her",
              senderName: sender.trim(),
              text: text.trim(),
              time: time.trim()
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    // show prefetched messages immediately if available
    try {
      const pref = sessionStorage.getItem('prefetch_messages');
      if (pref) {
        const lines = JSON.parse(pref);
        const parsed = parseLines(lines);
        if (parsed && parsed.length) setMessages(parsed);
      }
    } catch (e) {
      // ignore parse errors
    }

    // always fetch latest chat in background and replace prefetched data when ready
    setLoadingMore(true);
    const API = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/messages';
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const lines = data.messages || [];
        const parsedMessages = parseLines(lines);
        setMessages(parsedMessages);
        try { sessionStorage.setItem('chat_messages', JSON.stringify(lines)); } catch(e) {}
        setLoadingMore(false);
      })
      .catch((err) => {
        console.error("Error loading messages:", err);
        setLoadingMore(false);
      });
  }, []);


  useEffect(() => {
    const nav = document.querySelector(".nav");
    const main = document.querySelector(".main-content");

    if (nav) {
      if (isFullscreen) {
        // save current computed/display value and hide
        prevNavDisplayRef.current = nav.style.display || window.getComputedStyle(nav).display;
        nav.style.display = "none";
        // mark body so other UI (like teddy) can respond
        document.body.classList.add("whatsapp-fullscreen");
      } else {
        // restore previous display (if we saved one), otherwise clear inline style
        if (prevNavDisplayRef.current) nav.style.display = prevNavDisplayRef.current;
        else nav.style.display = "";
        document.body.classList.remove("whatsapp-fullscreen");
      }
    }

    // preserve previous main padding (inline) so we can restore it reliably
    if (main) {
      if (prevMainPaddingRef.current === null) {
        prevMainPaddingRef.current = main.style.paddingTop || "";
      }
      // when entering fullscreen, remove top padding so content sits flush under nav
      if (isFullscreen) main.style.paddingTop = "0px";
      else main.style.paddingTop = prevMainPaddingRef.current || "";
    }

    return () => {
      if (nav) {
        if (prevNavDisplayRef.current) nav.style.display = prevNavDisplayRef.current;
        else nav.style.display = "";
      }
      if (main) main.style.paddingTop = prevMainPaddingRef.current || "";
      // ensure body class cleaned up on unmount
      document.body.classList.remove("whatsapp-fullscreen");
    };
  }, [isFullscreen]);

  // handle infinite scroll / load newer messages on scroll-to-bottom
  useEffect(() => {
    // All messages loaded upfront, no need for scroll handler
  }, []);

  // scroll to bottom when initial messages load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // keep at top on initial load (oldest-first) — ensure scrolled to top
    setTimeout(() => {
      el.scrollTop = 0;
    }, 0);
  }, [messages]);

  return (
    <div className={`${isFullscreen ? "fixed inset-0  bg-[#e5ddd5] flex items-center  justify-center" : "min-h-screen bg-[#e5ddd5] flex items-center justify-center "}`}>
      <div className={`flex flex-col w-full ${isFullscreen ? "h-screen" : "max-w-full md:max-w-5xl md:mt-0  md:h-[90vh]"}`}>
        
        {/* CHAT WINDOW */}
        <div className="w-full bg-white shadow-lg rounded-lg md:rounded-xl flex flex-col overflow-hidden h-screen ">
          
          {/* Profile Bar - FIXED (sticky) */}
         <div className="sticky top-0 bg-[#075e54] text-white p-2 md:p-4 flex items-center gap-2 md:gap-3 shrink-0 z-20">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-full overflow-hidden shrink-0">
              <img 
                src= {whatsappbg}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-xs md:text-sm truncate">Buddhudi 💕</div>
              <div className="text-[10px] md:text-xs opacity-90">Active now</div>
            </div>
            <div className="text-base md:text-lg cursor-pointer shrink-0 hover:scale-110 transition">📞</div>
            <div className="text-base md:text-lg cursor-pointer shrink-0 hover:scale-110 transition">📹</div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-base md:text-lg cursor-pointer shrink-0 hover:scale-110 transition"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? "↩️" : "⛶"}
            </button>
          </div>

          {/* Messages */}
          <div ref={containerRef} className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-3 min-h-0 relative bg-white">
            
            {/* Left Decorative Background Image - absolute inside container */}
            <div 
              className="fixed left-0 top-10 h-full pointer-events-none "
              style={{
                width: '50%',
                opacity: 10,
                 backgroundImage: `url(${whatsappbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Right Decorative Background Image - absolute inside container */}
            <div 
              className="fixed right-0 top-10 h-full pointer-events-none"
              style={{
                width: '50%',
                opacity:10,
                 backgroundImage: `url(${whatsappbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Messages Content */}
            <div className="space-y-2 md:space-y-3 relative z-10">
              {loadingMore && (
                <div className="text-center text-xs opacity-70 mb-2">Loading older messages...</div>
              )}
              {messages.map((msg, idx) => {
                const isMe = msg.sender === "me";
                return (
                  <div key={idx} className="flex flex-col">
                    
                    {/* Sender Badge Color */}
                    <div
                      className={`inline-block text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5 w-fit shadow-sm
                        ${isMe ? "bg-teal-600 text-white ml-auto" : "bg-pink-600 text-white"}`}
                    >
                      {isMe ? "Ankit" : msg.senderName}
                    </div>

                    {/* Chat Bubble Color */}
                    <div
                      className={`px-3 py-1.5 rounded-2xl leading-snug transition text-sm w-fit shadow-md
                        ${isMe ? "ml-auto bg-[#144D37] text-white" : "bg-gray-800 text-white"}
                        hover:scale-[1.02] hover:shadow-lg max-w-[85%] sm:max-w-[65%] md:max-w-[50%]`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      <div className={`text-[9px] opacity-70 mt-1 text-right ${isMe ? "text-white" : "text-white"}`}>
                        {msg.time} {isMe && "✓✓"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div className="relative z-20 border-t p-2 md:p-3 flex gap-1 md:gap-2 items-center bg-[#f0f0f0] shrink-0">
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 sticky bottom-0 bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm focus:outline-none"
            />
            <button className="text-[#075e54] text-sm md:text-lg shrink-0 hover:scale-110 transition">😊</button>
            <button className="text-[#075e54] text-sm md:text-lg shrink-0 hover:scale-110 transition">➤</button>
          </div>

        </div>
      </div>
    </div>
  );
}
