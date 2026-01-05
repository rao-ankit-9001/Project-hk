import { useState, useEffect, useRef } from "react";
import gif3 from "../assets/3.gif";
function BottomSection() {
  const [showLetter, setShowLetter] = useState(false);
  const [typedText, setTypedText] = useState({
    firstMeet: "",
    firstDate: "",
    anniversary: ""
  });
  const [isVisible, setIsVisible] = useState({
    firstMeet: false,
    firstDate: false,
    anniversary: false
  });
  const [hearts, setHearts] = useState([]);
  const buttonRef = useRef(null);

  const firstMeetRef = useRef(null);
  const firstDateRef = useRef(null);
  const anniversaryRef = useRef(null);
  const letterSectionRef = useRef(null);
  const firstMeetScrollRef = useRef(null);
  const firstDateScrollRef = useRef(null);
  const anniversaryScrollRef = useRef(null);

  const [selectedGallery, setSelectedGallery] = useState(null); // 'firstMeet' | 'firstDate' | 'anniversary'
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState({ firstMeet: false, firstDate: false, anniversary: false });

  const fullTexts = {
    firstMeet: "“priya ye safar logo k liye ek safar tha lekin apni phli mulakat thi yaad hai m baar baar aapse puchta tha apne mile wo khani btao pta nhi ku usko sun k alg hu sukoon milta tha us din pta nhi kya huaa tha koi tension na fikar bs train aane ka intzar. lag rha tha jaise bs ab aur kuch nhi chahiye zindagi me. Train me itne shor ke beech apn kitna busy the bs mujhe aap aur aapko mai dikh rha tha. Indore mere liye ek nya shar nhi tha meri ek nyi khani thi jo mujhe forever aapko sunni thi.”",
    firstDate: "“Hamari pehli date ek zoo se shuru hui. Woh zoo jitna socha tha usse kahin zyada khoobsurat nikla, lekin usse bhi zyada khoobsurat tha tumhare saath usse dekhna. Aaj bhi us zoo ki ek‑ek yaad mere andar zinda hai. Us din pata nahi kyun main tumhara haath pakadne mein hichkichaa raha tha, par aakhir tumne khud hi pakad liya. Jitna sukoon zoo ke animals dekhne mein nahi mil raha tha, usse zyada tumhare saath hone mein tha. Aur baar‑baar guide keh raha tha — ‘Ankit idhar aao, dekho idhar, abhi to bahut bada hai, ghoomte‑ghoomte pair dukhne lag jayenge’ — aur main bas tumhari muskaan mein kho gaya tha. Aaj woh zoo to wahi hai, lekin hamare beech bahut kuch badal gaya. Mere paas dene ko ab kuch nahi, bas woh yaadein hain jo main hamesha tumhe de sakta hoon.”",
    anniversary: "“Ye pal bhi kitna khoobsurat tha na… kab baat karte‑karte ek‑dusre ke ho gaye, pata hi nahi chala. Maze‑maze mein ek‑dusre ko propose kar diya — na koi romantic line, na koi romantic scene — aur itne close ho gaye ki baat kiye bina na subah hoti, na raat ko neend aati. Main wait kar raha tha ki kab jaldi se 5 months complete ho aur Buddhudi ko surprise du. Waise ‘Buddhudi’ naam bhi ajeeb hai na — tumhara thoda bacha banna aur mera ‘buddhu’ bol kar samjhana, aur buddhu se meri Buddhudi ban gayi. Aaj bhi 5 months sirf 5 din ke barabar lagte hain. Bahut mushkil hai un yaadon ko bhulana — har jagah mera naam hona: room ki diwaron par, paani ki bottle par, study table par, aur tumhare dil par.”"
  };

  // Galleries: add as many URLs as you like for each section
  const galleries = {
    firstMeet: [
      "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595838/Snapchat-547978172_m0sns6.jpg"
    ],
    firstDate: [
      "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595088/IMG-20240125-WA0014_vc847z.jpg"
    ],
    anniversary: [
      "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595413/Screenshot_20251231-101750.Files_by_Google_dh9bez.png"
    ]
  };

  const loveEmojis = ["💕", "💖", "💗", "💝", "💞", "💓", "❤️", "🥰"];

  // Typing effect handler
  const startTyping = (cardName) => {
    let index = 0;
    const text = fullTexts[cardName];
    setTypedText(prev => ({ ...prev, [cardName]: "" }));

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(prev => ({
          ...prev,
          [cardName]: text.substring(0, index + 1)
        }));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 25);
  };

  // Intersection Observer for auto-typing
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardName = entry.target.getAttribute('data-card');
          if (cardName && !isVisible[cardName]) {
            setIsVisible(prev => ({ ...prev, [cardName]: true }));
            startTyping(cardName);
          }
        }
      });
    }, { threshold: 0.6 });

    if (firstMeetRef.current) observer.observe(firstMeetRef.current);
    if (firstDateRef.current) observer.observe(firstDateRef.current);
    if (anniversaryRef.current) observer.observe(anniversaryRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  // Create floating love emojis from button position
  const createFloatingHearts = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      startX: buttonCenterX,
      startY: buttonCenterY,
      offsetX: (Math.random() - 0.5) * 200, // Random horizontal spread
      emoji: loveEmojis[Math.floor(Math.random() * loveEmojis.length)],
      duration: Math.random() * 1.5 + 2.5 // 2.5s to 4s
    }));
    
    setHearts(newHearts);

    // Remove hearts after animation completes
    setTimeout(() => setHearts([]), 5000);
  };

  const handleOpenLetter = () => {
    setShowLetter(!showLetter);
    if (!showLetter) {
      createFloatingHearts();
    }
  };

  return (
    <>
      {/* Special moments */}
      <section id="moments" className="section">
        <div className="font-bold mb-6 ml-4">
          <h2 className="text-2xl mb-2">
            Special moments{" "}
          </h2>
          
          <span className="text-lg ml-10 md:text-base bg-pink-100 text-pink-600 px-3 py-1 rounded-full inline-block">
            First meet • First date • Anniversary
          </span>
        </div>

        {/* Grid Layout */}
        <div className="px-4 max-w-7xl mx-auto">
          {/* First meet and First date - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* First meet */}
            <div 
              ref={firstMeetRef}
              data-card="firstMeet"
              className="card glow relative bg-linear-to-b from-pink-100 to-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="absolute inset-0 -m-2 rounded-2xl bg-linear-to-br from-pink-200/25 via-transparent to-transparent -z-10 blur-xl"></div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 text-gray-800">
                First meet
              </h3>
              <img
                className="w-full h-auto object-contain rounded-xl shadow-md hover:shadow-lg transition mb-3"
                src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595838/Snapchat-547978172_m0sns6.jpg"
                alt="First meet"
              />
              <p className="text-md font-medium md:text-sm lg:text-base text-gray-700 leading-relaxed min-h-24 h-auto">
                {typedText.firstMeet}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* First date */}
            <div 
              ref={firstDateRef}
              data-card="firstDate"
              className="card glow relative bg-linear-to-b from-pink-100 to-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="absolute inset-0 -m-2 rounded-2xl bg-linear-to-br from-pink-200/25 via-transparent to-transparent -z-10 blur-xl"></div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 text-gray-800">
                First date
              </h3>
              <img
                className="w-full h-auto object-contain rounded-xl shadow-md hover:shadow-lg transition mb-3"
                src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595088/IMG-20240125-WA0014_vc847z.jpg"
                alt="First date"
              />
              <p className="text-md font-medium md:text-sm lg:text-base text-gray-700 leading-relaxed min-h-24 h-auto">
                {typedText.firstDate}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          {/* Anniversary - Full width */}
          <div 
            ref={anniversaryRef}
            data-card="anniversary"
            className="card glow relative bg-linear-to-b from-pink-100 to-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            <div className="absolute inset-0 -m-2 rounded-2xl bg-linear-to-br from-pink-200/25 via-transparent to-transparent -z-10 blur-xl"></div>
            
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 text-gray-800">
              Anniversary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image */}
              <img
                className="w-full h-auto object-contain rounded-xl shadow-md hover:shadow-lg transition"
                src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595413/Screenshot_20251231-101750.Files_by_Google_dh9bez.png"
                alt="Anniversary"
              />

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="text-md font-medium md:text-sm lg:text-base text-gray-700 leading-relaxed min-h-24 h-auto">
                  {typedText.anniversary}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secret letter */}
      <section id="letter" className="section py-8 relative" ref={letterSectionRef}>
        <h2 className="text-2xl font-bold text-center mb-6 ml-4">
          Secret letter{" "}
          <span className="text-xl bg-pink-100 text-pink-600 px-3 py-1 rounded-full inline-block">
            Sirf tumhare liye
          </span>
        </h2>
        <div className="max-w-2xl mx-auto px-4">
          <div className="card bg-linear-to-b from-pink-50 to-white border-2 border-pink-300 rounded-2xl shadow-lg p-6 relative">
            <p className="text-sm md:text-sm lg:text-base text-gray-600 mb-4 text-center">
              Ek chhota surprise — heart dabao aur letter khul jayega.
            </p>
            <div className="text-center mb-4">
              <button
                ref={buttonRef}
                className="px-4 md:px-6 py-2 md:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition transform hover:scale-105 text-md md:text-sm shadow-md relative inline-block"
                onClick={handleOpenLetter}
              >
                <span className={`inline-block transition-transform ${showLetter ? 'animate-heartbeat' : ''}`}>
                  ❤️
                </span>
                {' '} Open my heart
              </button>
            </div>

            {/* Floating love emojis - Starting from button */}
            {hearts.map(heart => (
              <div
                key={heart.id}
                className="fixed pointer-events-none text-3xl md:text-4xl font-bold"
                style={{
                  left: `${heart.startX}px`,
                  top: `${heart.startY}px`,
                  animation: `floatUpFromButton ${heart.duration}s ease-out forwards`,
                  '--offset-x': `${heart.offsetX}px`,
                  opacity: 1,
                  zIndex: 50
                }}
              >
                {heart.emoji}
              </div>
            ))}

            {/* Secret Letter Content */}
            {showLetter && (
              <div className="mt-6 p-4 md:p-6 bg-linear-to-b from-pink-100 to-white rounded-lg border border-pink-200 shadow-sm animate-fadeIn">
                <div className="flex items-center justify-center">
                  <img src={gif3} alt="gif" width={100} />
                </div>
                <p className="text-sm md:text-base lg:text-lg leading-10 text-gray-800 italic tracking-wide" 
                   style={{
                     fontFamily: "'Poppins', 'Georgia', serif",
                     letterSpacing: "0.5px",
                     lineHeight: "2"
                   }}>
                  Priya ❤️, ye chhota sa letter sirf tumhare liye hai. Har lafz mein meri dil ki baat chhupi hai. Tum meri zindagi ki sabse khoobsurat kahani ho. Tumhare bina main adhoora hoon. Har pal m tumhare saath bitana chahta tha. priya pta nhi kya kahu tumhare liye, lekin itna janta hoon ki tum meri zindagi ka sabse khoobsurat hissa ho. Priya pta nhi kya hua apne beech ya fir itne din ka hi saath the shayad. Priya m har roj rota rhta tha na ki aajo priya meri life me pta h m ku krta tha kuki mujhe wo pal yaad aate the jisme aap mere the wo waqt jb m aapke saath hota tha. Wo past mujhe aapse roj aur pyaar krta the aur m jis se pyaar krta the wo past the na ki aap kuki ager m aapse pyaar krta to m aaj bhi jaise ho wase chahe mere saath kasisa bhi behave kro lekin m pyaar krta. lekin priya merko meri Buddhudi chahiye thi aur chahiye gi uske lawa m kisi aur ko nhi accept kr skta ab wala aapka bhavior merko bht dukh deta hai priya. M jaisa bhi tha priya lekin m aapse bhot pyaar krta tha. aapke jitna maine akbhi kisi ko nhi kiya. aap ki ek ek chiz m khud k pass rakhta tha aapke kele wale chips ki bhot yaad aati hai yaar khride nhi jate mujh se dil me satisfactioin nhi milta pta nhi esa lagta wo test nhi aayega. Yaad to priya bhot chizo ki aati hai lekin ab unki jgh replace hone lag gyi. Good Bye Buddhudi ❤️.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            25% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(1);
            }
            75% {
              transform: scale(1.15);
            }
          }

          @keyframes floatUpFromButton {
            0% {
              transform: translateY(0) translateX(0) scale(1);
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh) translateX(var(--offset-x)) scale(0.3);
              opacity: 0;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-heartbeat {
            animation: heartbeat 0.6s ease-in-out infinite;
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </section>
    </>
  );
}

export default BottomSection;