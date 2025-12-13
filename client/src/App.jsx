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
      {loading && <Loader />} {/* ✅ Loader overlay */}
      <Routes>
        <Route path="/" element={<LoginForm setLoading={setLoading} />} />
        <Route
          path="/main/*"
          element={
            <PrivateRoute>
              <>
                <Nav setLoading={setLoading} /> {/* ✅ pass loader trigger */}
                <Mainroutes />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
