import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Mainroutes from "./routes/Mainroutes.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./utils/LoginForm.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Loader from "./loader/Loader.jsx"; // ✅ framer-motion loader

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Loader />
        </div>
      )}
      <Routes>
        <Route path="/" element={<LoginForm setLoading={setLoading} />} />
        <Route
          path="/main/*"
          element={
            <PrivateRoute>
              <>
                <Nav setLoading={setLoading} />
                <div className="main-content">
                  <Mainroutes setLoading={setLoading} /> {/* ✅ pass down */}
                  <Footer />
                </div>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
