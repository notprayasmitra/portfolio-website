import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { FaCalendar, FaLocationArrow, FaSun, FaMoon } from "react-icons/fa6";
import "../styles/components/homepage-widgets.css";

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
                <div className="widget-small">
                    <p className="widget-title">✦ Widget One</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Hello World!</span> Text</p>
                        <p className="commit-item"><span className="accent">Lorem</span> ipsum...</p>
                    </div>
                </div>

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