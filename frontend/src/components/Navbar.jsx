import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Projects", path: "/projects" },
]

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const getBreadcrumb = () => {
        if (location.pathname === "/") return "~/"
        return `~${location.pathname}/`
    }

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className="navbar">
                <span className="navbar-brand">
                    {getBreadcrumb()}<span className="cursor">▌</span>
                </span>

                {/* Desktop links */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={location.pathname === link.path ? "active" : ""}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger — mobile only */}
                <button
                    className="navbar-hamburger"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                </button>
            </nav>

            {/* Sidebar overlay */}
            <div
                className={`sidebar-overlay ${menuOpen ? "visible" : ""}`}
                onClick={closeMenu}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <span className="sidebar-brand">
                        {getBreadcrumb()}<span className="cursor">▌</span>
                    </span>
                    <button className="sidebar-close" onClick={closeMenu}>✕</button>
                </div>
                <ul className="sidebar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={location.pathname === link.path ? "active" : ""}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}

export default Navbar;