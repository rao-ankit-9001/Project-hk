import { useState } from "react";
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

    const doLogin = async (latitude = null, longitude = null) => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, latitude, longitude }),
        });

        const data = await res.json();
        if (res.ok) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("username", data.username);

          // Prefetch a seeded set of messages so chat is ready when user navigates
          try {
            const SAMPLE = `23/08/23, 5:35 pm - Rao_ankit: hii
23/08/23, 5:35 pm - Rao_ankit: hlo
23/08/23, 5:35 pm - Buddhudi: 😁😁
23/08/23, 5:35 pm - Rao_ankit: 👊👊
23/08/23, 5:35 pm - Buddhudi: 😝
23/08/23, 5:35 pm - Rao_ankit: dp nhi dikha rha mujhe
23/08/23, 5:35 pm - Rao_ankit: ha ab dikhai h
23/08/23, 5:35 pm - Buddhudi: ab dekho
23/08/23, 5:36 pm - Rao_ankit: 😁
23/08/23, 5:36 pm - Buddhudi: aapki to jase jaan nikal jati h dp nhi dikhti tab
23/08/23, 5:36 pm - Buddhudi: 🤭🤭
23/08/23, 5:36 pm - Rao_ankit: ha
23/08/23, 5:36 pm - Rao_ankit: merko mja nhi aata jab tak samne wala ba dikhe
23/08/23, 5:36 pm - Rao_ankit: 🤭
23/08/23, 5:37 pm - Buddhudi: 🙃 acha ji
23/08/23, 5:37 pm - Rao_ankit: haji
23/08/23, 5:37 pm - Rao_ankit: priya
23/08/23, 5:37 pm - Rao_ankit: 🤭
23/08/23, 5:37 pm - Rao_ankit: le hi liye aapke number aakhir me 😆😆
23/08/23, 5:37 pm - Buddhudi: ha
23/08/23, 5:37 pm - Buddhudi: ha mane he diye h
23/08/23, 5:37 pm - Rao_ankit: 🤭
23/08/23, 5:37 pm - Buddhudi: merko lga kya pareshan. howo ge
23/08/23, 5:37 pm - Rao_ankit: call kroge kya ab
23/08/23, 5:38 pm - Buddhudi: abhi nhi
23/08/23, 5:38 pm - Rao_ankit: nhi nhi
23/08/23, 5:38 pm - Rao_ankit: to
23/08/23, 5:38 pm - Buddhudi: sachi me
23/08/23, 5:38 pm - Buddhudi: baad me kre ge 1 date k baad
23/08/23, 5:39 pm - Rao_ankit: ☹️
23/08/23, 5:39 pm - Buddhudi: ab pitt jao ge
23/08/23, 5:39 pm - Buddhudi: ase muh bnao ge to
23/08/23, 5:39 pm - Rao_ankit: aaj kr lete uske baad kr lenge aap bologe tab
23/08/23, 5:39 pm - Rao_ankit: 🤭😁
23/08/23, 5:39 pm - Buddhudi: yaar ajj nhi
23/08/23, 5:40 pm - Buddhudi: risk h ajj bhaar kabhi koi aa rha h kabhi koi
23/08/23, 5:40 pm - Buddhudi: 😁😁
23/08/23, 5:40 pm - Rao_ankit: dekh lo to khidki me se 😁
23/08/23, 5:40 pm - Buddhudi: or koi ruk k baat sun ne lgg jaye to
23/08/23, 5:41 pm - Rao_ankit: ha tumhari hi sunega
23/08/23, 5:41 pm - Rao_ankit: itni jor se chilaoge kya
23/08/23, 5:41 pm - Buddhudi: 🤭ha
23/08/23, 5:41 pm - Rao_ankit: tik h sun lene do to 😄
23/08/23, 5:41 pm - Buddhudi: fir baato se pta lg jaye ga ladke ka call h
23/08/23, 5:41 pm - Buddhudi: aacha merko to dar lgta h
23/08/23, 5:41 pm - Buddhudi: 😬
23/08/23, 5:41 pm - Rao_ankit: dar k aage jeet h
23/08/23, 5:42 pm - Rao_ankit: 🤭
23/08/23, 5:42 pm - Buddhudi: dar k aage fir sadhi hai 😝🤣🤣
23/08/23, 5:42 pm - Rao_ankit: 👊👊
23/08/23, 5:42 pm - Buddhudi: aap kya bta rhe the
23/08/23, 5:42 pm - Rao_ankit: call pr btana tha
23/08/23, 5:43 pm - Rao_ankit: 😁🤭
23/08/23, 5:43 pm - Buddhudi: 🙄
23/08/23, 5:43 pm - Buddhudi: bhot he
23/08/23, 5:43 pm - Rao_ankit: are sachi me
23/08/23, 5:43 pm - Buddhudi: ase bta do to
23/08/23, 5:43 pm - Rao_ankit: nhi
23/08/23, 5:43 pm - Buddhudi: thik fir kro wait
23/08/23, 5:43 pm - Buddhudi: 😁`;

            const lines = SAMPLE.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 500);
            sessionStorage.setItem('prefetch_messages', JSON.stringify(lines));
          } catch (e) {
            console.warn('prefetch seed failed', e);
          }

          // start background fetch of real chat data (non-blocking)
          fetch((import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/messages')
            .then(r => r.json())
            .then(d => {
              if (d && d.messages) sessionStorage.setItem('chat_messages', JSON.stringify(d.messages));
            })
            .catch(() => {});

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
    };

    // Try to get geolocation but do not block login if user denies or it fails
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => doLogin(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Geolocation failed or denied", err);
          doLogin(null, null);
        },
        { timeout: 10000 }
      );
    } else {
      doLogin(null, null);
    }
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
