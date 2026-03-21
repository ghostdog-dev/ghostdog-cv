import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CvView from "./pages/CvView";
import Chat from "./pages/Chat";
import ApiDoc from "./pages/ApiDoc";
import CliDoc from "./pages/CliDoc";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CvView />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/api" element={<ApiDoc />} />
          <Route path="/cli" element={<CliDoc />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
