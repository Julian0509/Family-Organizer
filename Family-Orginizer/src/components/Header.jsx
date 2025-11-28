import Navigation from "./Navbar";
import "../styles/header.css";

function Header() {
    return (
        <header className="header" >
            <div className="header-name">
                <h3>Family-Organizer</h3>
            </div>
            <div>
                <Navigation />
            </div>
            <div className="logout">
                logout
            </div>
        </header>
    );
}
export default Header;