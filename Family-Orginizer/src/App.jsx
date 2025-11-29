import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Register from "./components/Register";
import ShowData from "./components/Events";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="events" element={<ShowData/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App; 
