import Navigation from "./Navbar";
import "../styles/styling.css";
import useToken from "./useToken";
import { useNavigate } from "react-router-dom";

function Header() {
    const {setToken} = useToken();
    const navigate = useNavigate();
    const handleLogout = () => {
    setToken(null);
    navigate("/");                
  };

    return (
        <header className="headerw-full h-12 text-white flex items-center justify-between px-6 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl " >
            <div>
                <h3 className="text-lg font-semibold m-0">Family-Organizer</h3>
            </div>
            <div>
                <Navigation />
            </div>
            <button onClick={handleLogout} className="ml-4 bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded transition">
                Logout
            </button>
        </header>
    );
}
export default Header;