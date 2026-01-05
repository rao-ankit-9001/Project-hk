import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css"

function Nav({ setLoading }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ✅ Loader trigger function
  const handleNavClick = () => {
    closeMenu();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // loader 1.5s ke liye
  };

  return (
    <div className="nav">
      <div className="brand">
        <NavLink to="/main" className="cute-text" onClick={handleNavClick}>
          🌸 Hamari Kahani 🌸
        </NavLink>
      </div>

      <div className="hamburger" onClick={toggleMenu}>☰</div>

      <div className={`tabs ${menuOpen ? "show" : ""}`}>
        <NavLink to="/main/apps" className={({ isActive }) => `tab ${isActive ? "active" : ""}`} onClick={handleNavClick}>
          💬 WhatsApp
        </NavLink>
        <NavLink to="/main/instagram" className={({ isActive }) => `tab ${isActive ? "active" : ""}`} onClick={handleNavClick}>
          📸 Instagram
        </NavLink>
        {/* <NavLink to="/main/snapchat" className={({ isActive }) => `tab ${isActive ? "active" : ""}`} onClick={handleNavClick}>
          👻 Snapchat
        </NavLink> */}
        <NavLink to="/main/moments" className={({ isActive }) => `tab ${isActive ? "active" : ""}`} onClick={handleNavClick}>
          💖 Special Moments
        </NavLink>
        <NavLink to="/main/music" className={({ isActive }) => `tab ${isActive ? "active" : ""}`} onClick={handleNavClick}>
          🎵🧸 Play music
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
