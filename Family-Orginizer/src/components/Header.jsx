import Navigation from "./Navbar";
import "../styles/styling.css";
import useToken from "./useToken";
import { useNavigate } from "react-router-dom";

function getRoleFromToken() {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

function Header() {
    const {setToken} = useToken();
    const navigate = useNavigate();
    const handleLogout = () => {
        setToken(null);
        navigate("/login");                
    };
    const manageUser = () => {
        navigate("/manageUser");                
    };
    const role = getRoleFromToken();


    return (
        <header className="headerw-full h-12 text-white flex items-center justify-between px-6 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl " >
            <div>
                <h3 className="text-lg font-semibold m-0">Family-Organizer</h3>
            </div>
            <div>
                <Navigation />
            </div>
            <div>
                {role === "admin" && (
                <button onClick={manageUser} className="ml-4 bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded transition">
                    Manage User
                </button>
            )}
            <button onClick={handleLogout} className="ml-4 bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded transition">
                Logout
            </button>
            </div>
        </header>
    );
}
export default Header;