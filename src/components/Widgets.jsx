import { useState, useEffect } from "react";
import { FaCalendar, FaLocationArrow} from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Click Me Widget
function ClickMeWidget() {
    const [count, setCount] = useState(0)

    return (
        <div className="widget">
            <p className="widget-count">{count.toLocaleString()}</p>
            <button className="click-btn" onClick={() => setCount(count + 1)}>
                CLICK ME
            </button>
            <p className="widget-sub">you've clicked {count} times</p>
        </div>
    )
}

// Let's Connect Widget
function ConnectWidget() {
    return (
        <div className="widget">
            <p className="widget-title"><FaCalendar /> Let's Connect</p>
            <p className="widget-desc">Always open to interesting projects and conversations.</p>
            <a href="mailto:notprayasmitra@proton.me" className="book-btn">
                <FaCalendar /> Book a Chat
            </a>
        </div>
    )
}

// Map Widget
function MapWidget() {
    const position = [13.08268, 80.27072]

    return (
        <div className="widget map-widget">
           <p className="widget-title"><FaLocationArrow /> Currently Based In</p> 
           <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="leaflet-map" zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="" />
           </MapContainer>
           <p className="widget-sub">● Chennai, Tamil Nadu</p>
        </div>
    )
}

function Widgets() {
    return (
        <div className="widgets-grid">
            <ConnectWidget />
            <MapWidget />
            <ClickMeWidget />
        </div>
    )
}

export default Widgets;