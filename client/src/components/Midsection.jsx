import bgImage1 from "../assets/video/bg1.jpg"; // Import the background image
import bgImage2 from "../assets/video/bg2.jpg"; // Import the background image
import bgImage3 from "../assets/video/bg3.jpg"; // Import the background image
import anniversaryVideo from "../assets/video/anniversary.mp4"; // Import the video file
import { useState } from "react";


function Maidsection() {

  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="container mx-auto px-4">
      {/* App-style section */}
      <section id="apps" className="section my-8 ">
        <h2 className="text-2xl font-bold text-center mb-6">
          Hamare apne moments{" "}
          <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full  ">
            WhatsApp • Instagram • Snapchat
          </span>
        </h2>
       <div className="grid md:grid-cols-3 gap-6">
  {/* WhatsApp */}
  <div className="card bg-fuchsia-50 shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">
      WhatsApp — First chat
    </h3>
      <img src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595319/Screenshot_20251210-195332.WhatsApp_Business_uhc2og.png" alt="img" />
  </div>

  {/* Instagram */}
  <div className="card bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">
      Instagram — Pehli selfie
    </h3>
    <div className="flex gap-4 mb-4">
      <div className="ring-2 ring-pink-500 w-16 h-16 rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595310/Screenshot_20240127-165843_jfq89s.png"
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ring-2 ring-pink-500 w-16 h-16 rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767617744/Screenshot_20240217-195753_bw1exe.jpg"
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ring-2 ring-pink-500 w-16 h-16 rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595311/Screenshot_20240127-213759_fpvgbd.png"
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
   <div className="grid grid-cols-2 gap-4">
  <div className="ig-item">
    <img
      src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595289/IMG_20240123_195009391_nnsmsi.jpg"
      alt="First selfie"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
  <div className="ig-item">
    <img
      src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595290/IMG_20240126_081201831_HDR_futni3.jpg"
      alt="Coffee date"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
  <div className="ig-item col-span-2">
    <img
      src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767617907/IMG-20240126-WA0062_vguu6h.jpg"
      alt="Sunset walk"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
</div>

    <div className="text-center mt-4 text-gray-600 italic">
      “Aur yeh moment forever ban gaya.” ❤️
    </div>
  </div>

  {/* Snapchat */}
  <div className="card bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">
      Snapchat — Pehli streak
    </h3>
    <div className="streak text-red-500 font-medium mb-4 flex items-center gap-2">
      <span className="text-2xl">🔥</span>
      Hamari pehli streak — us din se har din tum meri streak ho
    </div>
    <div className="snap-card relative">
      <img
        src="https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767623680/Screenshot_20260105-200307.Files_by_Google_1_rxjov8.png"
        alt="Snap memory"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="snap-reveal absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity">
        Tap to reveal — “Tum meri favorite filter ho”
      </div>
    </div>
  </div>
</div>

      </section>

      {/* Timeline */}
      <section id="timeline" className="section my-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Love timeline{" "}
          <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
            Day 1 → Forever
          </span>
        </h2>
        <div className="space-y-6">
          <div
            className="card bg-cover bg-center bg-no-repeat shadow-md rounded-lg  text-white"
            style={{
              backgroundImage: `url(${bgImage1})`, // Use imported image
            }}
          >
            <div className="bg-black/40 p-4 rounded-lg">
              <div className="chip bg-pink-100 text-pink-600 px-2 py-1 rounded-full inline-block mb-2">
                Day 1
              </div>
              <p className="moment-line font-medium leading-10 bg-no-repeat shadow-md rounded-lg  text-white">
                <strong> “Us </strong> din tumne mujhe pehli baar dekha tha…
                main apni bullet par tha, aur tum apni scooty par didi ke saath.
                Mujhe toh khabar bhi nahi thi ki tumhari nazar mujh par tik gayi
                hai. Phir tumhari pehli call aayi… aur tumhari pyari si aawaz
                mein tumne kaha — ‘Kahan ghoom rahe ho? Maine aapko dekha, aap
                mast lag rahe the.’ Us pal mein laga jaise duniya ruk gayi ho…
                tumhari aawaz mere dil ki sabse khoobsurat yaad ban gayi. Aaj
                bhi jab us din ko yaad karta hoon, dil mein ek nayi roshni jagti
                hai, jaise tumhari nazar aur tumhari baat meri zindagi ka pehla
                tohfa thi.”
              </p>
              <p className="subtitle ">
                <p className=" text-white animate-pulse font-medium">
                  Har naya din ek nayi yaad. Har yaad me tum.
                </p>
              </p>
            </div>
          </div>

          <div
            className="card bg-cover bg-center bg-no-repeat shadow-md rounded-lg  text-white"
            style={{
              backgroundImage: `url(${bgImage2})`, // Use imported image
            }}
          >
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="chip bg-pink-100 text-pink-600 px-2 py-1 rounded-full inline-block mb-2 ">
                First date
              </div>
              <p className="moment-line font-medium  rounded-md">
                <p className="leading-10">
                  <strong> “Hamari </strong> pehli mulaqat ek chhoti si train
                  journey thi — tum ekeli seat par khidki ke paas bethi thi, aur
                  main dhadkanon ke saath wahan aaya. Jab maine tumhara hath
                  pakda, tumhari ungliyon ki narmi aur us pal ki khamosi ne meri
                  duniya rok di. Phir maine tumhe apne gale lagaya, aur woh
                  ehsaas aaj bhi mere dil ke sabse kareeb hai. Us din maine
                  tumhe ek gulab diya, aur tumhari muskaan us gulab se bhi zyada
                  khoobsurat thi. Aur jab maine tumhe chocolate di, toh laga
                  jaise zindagi ki sabse meethi yaad mere haathon me aa gayi ho.
                  Woh chhoti si train journey meri zindagi ki sabse badi yaad
                  ban gayi — ek yaad jo har din mujhe tumhari taraf kheenchti
                  hai, aur har pal mujhe tumse aur zyada mohabbat karna sikhati
                  hai.”
                </p>
                <p className="subtitle">
                  <p className=" text-white animate-pulse">
                    Us pal se lekar aaj tak, main bas tumhe dekh kar muskuraata
                    hoon.
                  </p>
                </p>
              </p>
            </div>
          </div>

          <div
      className="card bg-cover bg-center bg-no-repeat shadow-md rounded-lg text-white"
      style={{ backgroundImage: `url(${bgImage3})` }}
    >
      <div className="bg-black/40 p-6 rounded-lg">
        <div className="chip bg-pink-100 text-pink-600 px-3 py-1 rounded-full inline-block mb-4">
          5 Month Anniversary 🎂
        </div>

        {/* Emotional Line */}
        <p className="moment-line font-medium leading-8">
          <strong>“Hamare</strong> Hamare 5 month poore hone par maine tumhe ek cake bheja tha. Us din tumne meri T‑shirt pehn kar cake cut kiya, aur tumhari khushi meri zindagi ka sabse meetha pal ban gayi. Tumne us cake ka ek bhi bite waste nahi hone diya — jaise wo cake maine apne haathon se tumhare liye banaya ho”
        </p>

        {/* Subtitle */}
        <p className="subtitle ">
          <p className=" text-white animate-pulse">

          "Har bite mein mohabbat, har smile mein yaadein…"
          </p>
        </p>

        {/* Cute Button */}
{!showVideo && (
  <button
    onClick={() => setShowVideo(true)}
    className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
  >
    🌸 Anniversary Moment 🎂✨
  </button>
)}

{/* Video Reveal */}
{showVideo && (
  <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
    <video
      controls
      autoPlay
      onEnded={() => setShowVideo(false)}   // 👈 Ye line video khatam hone par hide karegi
      className="w-full h-100 rounded-lg border-4 border-pink-200"
    >
      <source src="https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595840/Snapchat-1298994738_ezkmca.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

      </div>
    </div>

        </div>
      </section>
    </div>
  );
}

export default Maidsection;
