import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { FaCalendar, FaLocationArrow, FaSun, FaMoon, FaPalette } from "react-icons/fa6";
import "../styles/components/homepage-widgets.css";
import { themes, accentColors } from "../data/themes";

function ThemeWidget() {
    const [activeTheme, setActiveTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "Mocha";
        }
        return "Mocha";
    });

    const [activeAccent, setActiveAccent] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("accent") || "#e8789a";
        }
        return "#e8789a";
    });

    function applyTheme(themeName, accent) {
        const vars = themes[themeName];
        if (!vars) return;
        const root = document.documentElement;
        Object.entries(vars).forEach(([key, val]) => {
            root.style.setProperty(key, val);
        });
        root.style.setProperty("--accent-pink", accent);
        root.style.setProperty("--accent-purple", accent + "cc");
        setActiveTheme(themeName);
        setActiveAccent(accent);
        localStorage.setItem("theme", themeName);
        localStorage.setItem("accent", accent);

        window.dispatchEvent(new Event("themechange"));
    }

    return (
        <div className="widget-small">
            <p className="widget-title"><FaPalette /> Theme</p>

            <div className="theme-tabs">
                <div className="theme-tabs-row">
                    {["Latte", "Frappe", "Macchiato"].map((name) => (
                        <button
                            key={name}
                            className={`theme-tab ${activeTheme === name ? "active" : ""}`}
                            onClick={() => applyTheme(name, activeAccent)}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <button
                    className={`theme-tab theme-tab-full ${activeTheme === "Mocha" ? "active" : ""}`}
                    onClick={() => applyTheme("Mocha", activeAccent)}
                >
                    Mocha
                </button>
            </div>

            <div className="accent-grid">
                {accentColors.map((color) => (
                    <button
                        key={color}
                        className={`accent-swatch ${activeAccent === color ? "active" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => applyTheme(activeTheme, color)}
                        title={color}
                    />
                ))}
            </div>
        </div>
    );
}

function LocationWidget() {
    const [time, setTime] = useState("");
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Kolkata",
                })
            );
            const hour = parseInt(
                now.toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: false,
                    timeZone: "Asia/Kolkata",
                })
            );
            setIsNight(hour < 6 || hour >= 20);
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="widget-small location-widget">
            <p className="widget-title"><FaLocationArrow size={16}/> Currently Based In</p>
            <div className="location-map-wrapper">
                <MapContainer
                    center={[13.08268, 80.27072]}
                    zoom={10}
                    scrollWheelZoom={true}
                    dragging={true}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    />
                </MapContainer>
            </div>
            <div className="location-footer">
                <span className="location-city">Chennai, Tamil Nadu</span>
                <span className="location-time">
                    {isNight ? <FaMoon size={10} /> : <FaSun size={10} />} {time}
                </span>
            </div>
        </div>
    );
}

function Widgets() {
    return (
        <div className="widgets-wrapper">
            <div className="widgets-top-row">
                <ThemeWidget />

                <div className="widget-small">
                    <p className="widget-title"><FaCalendar /> Let's Connect</p>
                    <div className="widget-content">
                        <p className="connect-tagline">
                            Always open to interesting projects and conversations.
                        </p>
                    </div>
                    <div className="book-chat">
                        <a href="https://cal.com/notprayasmitra/15-min-chat" target="_blank" rel="noreferrer" className="book-chat-btn">
                            <FaCalendar /> Book a Chat
                        </a>
                    </div>
                </div>

                <LocationWidget />
            </div>
        </div>
    );
}

export default Widgets;