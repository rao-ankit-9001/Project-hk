import React, { useState, useEffect } from "react";

const isVideo = (url) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url);
const PRESET_DRIVE_LINK = "https://drive.google.com/drive/folders/YOUR_FOLDER_ID?usp=sharing";

export default function SpecialMoments() {
  const [selected, setSelected] = useState(null);

  const moments = [
    {
      title: "Our first trip together",
      images: [
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595834/Snapchat-255605863_gg3347.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595838/Snapchat-547978172_m0sns6.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595923/Snapchat-623625272_gakg9e.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595923/Snapchat-457921466-COLLAGE_qfr26f.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595836/Snapchat-457921466_xq1tag.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595834/Snapchat-255605863_gg3347.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595832/Snapchat-109490269_lk6zmm.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595415/Screenshot_20251231-101817.Files_by_Google_oh5wac.png",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595415/Screenshot_20251231-101852.Files_by_Google_clx7zk.png",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595077/IMG-20240123-WA0030_m6fsrm.jpg"
      ]
    },
    {
      title: "Tasveeron mein bandhi yaadein",
      images: [
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595297/IMG_20240227_122831_669_w24rnw.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595075/IMG-20240123-WA0007_niuwww.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595075/IMG-20240123-WA0008_evbbpg.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595099/IMG-20240126-WA0015_ebm6uw.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595097/IMG-20240126-WA0005_uiwuv8.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595834/Snapchat-1806050589_pe5qqa.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595087/IMG-20240125-WA0004_b6phvj.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595086/IMG-20240124-WA0034_ed3lax.jpg",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595832/Snapchat-122299365_zkhvj3.jpg",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595832/Snapchat-1195248255_cgmfba.jpg",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595924/Screenshot_20251231-102207.Files_by_Google_beyfh1.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595831/Snapchat-1042376201_ipfxk2.jpg",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595547/Screenshot_20251231-102017.Files_by_Google_wmwg5v.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595426/Screenshot_20251231-101705.Files_by_Google_n0ng8a.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595416/Screenshot_20251231-101509.Files_by_Google_e7h6cc.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595416/Screenshot_20251231-101803.Files_by_Google_d596ly.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595413/Screenshot_20251231-101757.Files_by_Google_ejhub1.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595412/Screenshot_20251231-101714.Files_by_Google_j3qc8y.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595412/Screenshot_20251231-101659.Files_by_Google_nqlhcg.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595411/Screenshot_20251231-101653.Files_by_Google_ya7sdj.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595409/Screenshot_20251231-101627.Files_by_Google_yrs5qm.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595408/Screenshot_20251231-101610.Files_by_Google_mguiup.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595406/Screenshot_20251231-101601.Files_by_Google_vgs3xw.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595406/Screenshot_20251231-101554.Files_by_Google_ph3kl7.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595335/Screenshot_20251231-101543.Files_by_Google_vkrb9l.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595334/Screenshot_20251231-101436.Files_by_Google_tc4fxd.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595317/Screenshot_20250110-115049_h5njll.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595317/Screenshot_20250707-091321_eb8s3f.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595311/Screenshot_20240127-213759_fpvgbd.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595310/Screenshot_20240127-165843_jfq89s.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595309/Screenshot_2023-09-28-22-49-03-60_a63b0f8076346d26cbdc1b971a1da2a7_mx9vo5.jpg",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595306/IMG_20251014_122740258_MP_AE_mvwbng.jpg",
      ]
    },
    {
      title: "Cute midnight chats",
      images: [
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595319/Screenshot_20251210-195332.WhatsApp_Business_uhc2og.png",
        "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595323/Screenshot_20251220-135027.WhatsApp_Business_bxmp2d.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595324/Screenshot_20251220-135124.WhatsApp_Business_vtgsbw.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595330/Screenshot_20251220-135308.WhatsApp_Business_a1juvp.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595330/Screenshot_20251220-135540.WhatsApp_Business_vqpksu.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595331/Screenshot_20251220-140255.WhatsApp_Business_jbxgyp.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595331/Screenshot_20251220-140018.WhatsApp_Business_kqsyys.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595331/Screenshot_20251220-140440.WhatsApp_Business_n7issf.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595426/Screenshot_20251231-101705.Files_by_Google_n0ng8a.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595418/Screenshot_20251231-101952.Files_by_Google_dugebd.png",
       "https://res.cloudinary.com/dxgfbjfh6/image/upload/v1767595417/Screenshot_20251231-101915.Files_by_Google_xvhtnw.png"








      ]
    }
    ,
    {
      title: "Apni Duniya ki Short Film",
      images: [
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595935/VN20240128_114237_hziz8j.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595935/VN20240314_144700_qnr6db.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595931/VN20240127_001427_oyua68.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595930/VID-20240126-WA0067_uhj2so.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595930/VN20240110_161157_zocv6k.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595838/Snapchat-1500120613_ulzzuq.mp4",
        "https://res.cloudinary.com/dxgfbjfh6/video/upload/v1767595839/Snapchat-428366594_re9u9r.mp4",

      ]
    }
  ];

  const [currentIndexes, setCurrentIndexes] = useState(() => moments.map(() => 0));
  const [isHovering, setIsHovering] = useState(() => moments.map(() => false));
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (modal) document.body.classList.add("whatsapp-fullscreen");
    else document.body.classList.remove("whatsapp-fullscreen");
    return () => document.body.classList.remove("whatsapp-fullscreen");
  }, [modal]);

  const advanceIndex = (momentIdx, delta) => {
    setCurrentIndexes((prev) => {
      const next = [...prev];
      const len = moments[momentIdx]?.images?.length || 1;
      next[momentIdx] = (next[momentIdx] + delta + len) % len;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-pink-100 to-purple-50 p-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-600 drop-shadow-md italic">
        Our Special Moments 💖
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {moments.map((moment, idx) => (
          <div
            key={idx}
            className="bg-transparent rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
          >
            <div className="relative">
              <div className="flex items-center justify-center mb-2 px-2 py-2">
                <h3 className="text-lg font-bold text-pink-500 italic tracking-wide">
                  ✨ {moment.title} ✨
                </h3>
              </div>

              <div
                className="w-full h-144 sm:h-160 md:h-176 lg:h-192 overflow-hidden rounded-lg relative p-2 flex items-center justify-center bg-neutral-900/5"
                onMouseEnter={() =>
                  setIsHovering((prev) => prev.map((v, i) => (i === idx ? true : v)))
                }
                onMouseLeave={() =>
                  setIsHovering((prev) => prev.map((v, i) => (i === idx ? false : v)))
                }
              >
                {moment.images && moment.images.length > 0 && (() => {
                  const currentUrl = moment.images[currentIndexes[idx] % moment.images.length];
                  return isVideo(currentUrl) ? (
                    <video
                      src={currentUrl}
                      controls
                      className="max-h-full max-w-full object-contain cursor-pointer rounded-xl shadow-2xl relative z-10"
                      onClick={() =>
                        setModal({
                          momentIndex: idx,
                          imageIndex: currentIndexes[idx] % moment.images.length
                        })
                      }
                    />
                  ) : (
                    <img
                      src={currentUrl}
                      alt={moment.title}
                      className="max-h-full max-w-full object-contain cursor-pointer rounded-xl shadow-2xl relative z-10"
                      onClick={() =>
                        setModal({
                          momentIndex: idx,
                          imageIndex: currentIndexes[idx] % moment.images.length
                        })
                      }
                    />
                  );
                })()}

                {/* soft vignette overlay to focus the image */}
                <div className="pointer-events-none absolute inset-0 rounded-lg">
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/30 rounded-lg mix-blend-overlay" />
                  <div className="absolute inset-0 rounded-lg" style={{boxShadow: 'inset 0 40px 80px rgba(0,0,0,0.12)'}} />
                </div>

                {moment.images.length > 1 && (
                  <>
                    <button
                      aria-label="Prev"
                      onClick={() => advanceIndex(idx, -1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-pink-400/70 text-white rounded-full p-2 shadow-md z-50"
                    >
                      ‹
                    </button>
                    <button
                      aria-label="Next"
                      onClick={() => advanceIndex(idx, 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-400/70 text-white rounded-full p-2 shadow-md z-50"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3 flex gap-2 justify-center">
                {moment.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrentIndexes((prev) =>
                        prev.map((v, j) => (j === idx ? i : v))
                      )
                    }
                    className={`w-3 h-3 rounded-full ${
                      i === currentIndexes[idx] ? "bg-pink-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => window.open("https://drive.google.com/drive/folders/1I9PFE5PU2hSkMVAxhJfvYmzyuxMQp2kU", "_blank")}
          className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
        >
          Download All Images & Videos
        </button>
      </div>

      {modal && (
        <Modal
          moment={moments[modal.momentIndex]}
          startIndex={modal.imageIndex}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function Modal({ moment, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.min(moment.images.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moment, onClose]);

  if (!moment) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-pink-500 text-3xl font-bold"
        >
          ✖
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="text-pink-400 text-3xl px-4"
          >
            ‹
          </button>

          <div className="w-full">
            <img
              src={moment.images[index]}
              alt={moment.title}
              className="w-full max-h-[70vh] object-contain rounded-lg shadow-md border-4 border-pink-100"
            />
            <div className="mt-3 bg-pink-200/70 rounded-lg py-3 px-4 text-center text-pink-800 font-semibold italic">
              💖 {moment.title} — {index + 1}/{moment.images.length}
            </div>

            <div className="mt-3 flex gap-2 justify-center overflow-x-auto">
              {moment.images.map((s, i) => (
                <div key={i} className={`w-20 h-14 relative rounded-lg overflow-hidden cursor-pointer border-2 ${i === index ? 'border-pink-400 shadow-lg' : 'border-gray-200'}`} onClick={() => setIndex(i)}>
                  {isVideo(s) ? (
                    <div className="w-full h-full flex items-center justify-center bg-black text-white text-sm">▶</div>
                  ) : (
                    <img src={s} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIndex((i) => Math.min(moment.images.length - 1, i + 1))}
            className="text-pink-400 text-3xl px-4"
          >
            ›
          </button>
        </div>
      
      </div>


    </div>
  );
}
