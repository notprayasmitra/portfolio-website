import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Projects", path: "/projects" },
    { label: "Achievements", path: "/achievements" },
    { label: "Testimonials", path: "/testimonials" },
]

function Navbar() {
    const location = useLocation()

    const getBreadcrumb = () => {
        if (location.pathname === "/") return "~/"
        return `~${location.pathname}/`
    }

    return (
        <nav className="navbar">
            <span className="navbar-brand">{getBreadcrumb()}<span className="cursor">▌</span></span>
            <ul className="navbar-links">
                {navLinks.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path} className={location.pathname === link.path ? "active" : ""}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar;