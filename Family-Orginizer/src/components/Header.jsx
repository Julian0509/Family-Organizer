import Navigation from "./Navbar";
import "../styles/styling.css";

function Header() {
    return (
        <header className="headerw-full h-12 bg-gray-600 text-white flex items-center justify-between px-6 shadow-md" >
            <div>
                <h3 className="text-lg font-semibold m-0">Family-Organizer</h3>
            </div>
            <div>
                <Navigation />
            </div>
            <button className="ml-4 bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded transition">
                Logout
            </button>
        </header>
    );
}
export default Header;