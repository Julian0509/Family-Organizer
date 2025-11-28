import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Register from "./components/Register";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App; 
