import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Register from "./components/Register";
import ShowData from "./components/Events";
import UseFetchData from "./components/FetchEvents";
import Kalender from "./components/Kalender";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Kalender />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="events" element={<UseFetchData/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App; 
