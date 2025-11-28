import Navigation from "./Navbar";
import "../styles/header.css";

function Header() {
    return (
        <header className="header" >
            <div className="header-name">
                <h3 className="text-lg font-semibold m-0">Family-Organizer</h3>
            </div>
            <div>
                <Navigation />
            </div>
            <button className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">
                Logout
            </button>
        </header>
    );
}
export default Header;