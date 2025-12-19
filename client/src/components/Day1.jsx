import React, { useEffect, useState, useRef } from 'react';
import './day1.css';
import Maidsection from './Midsection';
import BottomSection from './BottomSection';
import CuteTapWrapper from '../wrapper/CuteTapWrapper';

// import backgroundVideo from '../assets/video/get.mp4';

function Day1() {
  const DAY_ONE = '2023-01-01';
  const [daysSinceDayOne, setDaysSinceDayOne] = useState(0);
  const sparklesRef = useRef(null);
  const heartsRef = useRef(null);

  useEffect(() => {
    const updateCounter = () => {
      const d1 = new Date(DAY_ONE);
      const now = new Date();
      const diff = Math.floor((now - d1) / (1000 * 60 * 60 * 24));
      setDaysSinceDayOne(diff);
    };
    updateCounter();
  }, []);

  useEffect(() => {
    const sparkles = sparklesRef.current;
    if (sparkles) {
      for (let i = 0; i < 40; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDelay = Math.random() * 6 + 's';
        s.style.opacity = Math.random() * 0.8 + 0.2;
        sparkles.appendChild(s);
      }
    }
  }, []);

  useEffect(() => {
    const spawnHeart = () => {
      const heartsRoot = heartsRef.current;
      if (heartsRoot) {
        const h = document.createElement('div');
        h.className = 'heart-fx';
        const x = Math.random() * 100 + '%';
        const y = Math.random() * 80 + 10 + '%';
        const size = Math.random() * 18 + 12 + 'px';
        h.style.setProperty('--x', x);
        h.style.setProperty('--y', y);
        h.style.setProperty('--s', size);
        h.textContent = ['💕', '💖', '💞', '😺', '😘', '😉', '😍', '🥰', '🙈', '🙉', '🙊', '🎈', '🤞', '🤗'][Math.floor(Math.random() * 14)];
        heartsRoot.appendChild(h);
        setTimeout(() => h.remove(), 6500);
      }
    };

    const interval = setInterval(spawnHeart, 1400);
    for (let i = 0; i < 6; i++) spawnHeart();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="Main relative">
      

      {/* Soft sparkles */}
      <div className="sparkles" ref={sparklesRef}></div>

      {/* Floating hearts */}
      <div id="hearts" ref={heartsRef}></div>

      {/* Hero */}
      <section className="hero">
        <div className="chip counter">Day 1 se</div>
        <h1 className="title">Tum meri kahani ho — har chat, har photo, har dhadkan.</h1>
        
      <p className="subtitle font-semibold">
          Day 1 se lekar aaj tak, tum meri zindagi ki sabse khoobsurat wajah ho. Ye sirf website nahi,
          meri dil ki diary hai — jahan har page par tum ho, har click par ek nayi yaad hai. Agar kabhi din mushkil ho,
          ye page kholna: yahan tumhe hamesha meri muskaan milegi, meri baahon ka ehsaas hoga.
        </p>

        <div className="counter" id="loveCounter">
          It’s been {daysSinceDayOne} days since Day 1
        </div>
        <br />
          <div className="vow float-line">
        <CuteTapWrapper>
          <span className="vow-text hover:scale-110 duration-300 ease-in leading-7">“Har subah tumhari roshni se shuru hoti hai, har raat tumhari aawaz se aaram paati hai.”</span>
          <span className="balloon">
            <span className="string"></span>
          </span>
          </CuteTapWrapper>      
        </div>  

        <div className="vow float-line">
           <CuteTapWrapper>
          <span className="vow-text hover:scale-110 duration-300 ease-in leading-7">“Tum meri pehli dua ho, aur aakhri khwahish bhi — bas tum.”</span>
          <span className="balloon">
            <span className="string"></span>
          </span>
           </CuteTapWrapper>
        </div>

        <div className="vow float-line">
           <CuteTapWrapper>
          <span className="vow-text hover:scale-110 duration-300 ease-in leading-7">“Agar duniya kabhi tumse door lage, ya aansu aajayein, yaad rakhna: main yahin hoon, tumhare saath.”</span>
          <span className="balloon">
            <span className="string"></span>
          </span>
           </CuteTapWrapper>
        </div>
      </section>

      
    </div>

    <Maidsection/>
    <BottomSection/>
    </>
  );
}

export default Day1;