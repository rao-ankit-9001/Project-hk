import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gif1 from "../../src/assets/1.gif";

export default function LoginForm({ setLoading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ trigger global loader

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, latitude, longitude }),
        });

        const data = await res.json();
        if (res.ok) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("username", data.username);

          setTimeout(() => {
            setLoading(false); // ✅ hide loader
            navigate("/main");
          }, 2000);
        } else {
          setError(data.error);
          setLoading(false);
        }
      } catch (err) {
        console.error("Login error", err);
        setError("Something went wrong");
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      
   
      <div className="w-full max-w-sm p-8 pt-2 bg-white rounded-3xl shadow-lg border border-pink-200">
        <div className="flex items-center justify-center">
          <img src={gif1} alt="gif1" width={100} />
        </div>
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
          🌸 Cute Login 🌸
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username..."
              className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            💖 Login
          </button>
        </form>
      </div>
    </div>
  );
}
