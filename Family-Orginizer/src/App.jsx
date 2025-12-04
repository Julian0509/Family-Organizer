import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Events";
import Register from "./components/Register";
import Kalender from "./components/Kalender";
import Map from "./components/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Kalender />}></Route>
      <Route path="/events" element={<Home />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="map"element={<Map />}></Route>
    </Routes>
  );
}
export default App; 
