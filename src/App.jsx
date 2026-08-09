import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import RequestTow from "./pages/RequestTow";
import Tracking from "./pages/Tracking";
import Contact from "./pages/Contact";
import ScrollTotop from "./components/ScrollTotop";

function App() {
  return (
    <BrowserRouter>

    <ScrollTotop />
    
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/services" element={<Services />}/>
      <Route path="/request-tow" element={<RequestTow />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/contact" element={<Contact />} />
      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;