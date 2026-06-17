import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaCopyright, FaCodeCommit } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { LuClock } from "react-icons/lu"; // Cleaner outline clock to match the image

import "../styles/footer.css";

function Footer() {
    const [time, setTime] = useState("00:00:00");
    const [views] = useState("1,345,836");

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            const s = String(now.getSeconds()).padStart(2, "0"); // Image shows seconds!
            setTime(`${h}:${m}:${s}`);
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="status-footer-container">
            <div className="status-footer">
                <div className="status-left">
                    <span className="status-copy"><FaCopyright size={11}/> 2026 Prayas Mitra</span>
                    <span className="status-sep">|</span>
                    <span className="status-indicator">
                    <span className="status-dot" /> All Services Nominal</span>
                </div>
                
                <div className="status-right">
                    <span className="status-clock">
                        <LuClock size={14} className="icon-offset" /> {time}
                    </span>
                    <span className="status-sep">|</span>
                    <span className="status-views">{views} views</span>
                    <span className="status-sep">|</span>
                    <span className="status-commit">
                        <FaCodeCommit size={13} className="icon-offset" /> e6bced2
                    </span>
                    <span className="status-sep">|</span>
                    <div className="status-links">
                        <a href="https://github.com/notprayasmitra" target="_blank" rel="noreferrer"><FaGithub size={14} /></a>
                        <a href="https://linkedin.com/in/notprayasmitra" target="_blank" rel="noreferrer"><FaLinkedin size={14} /></a>
                        <a href="#" target="_blank" rel="noreferrer"><FaXTwitter size={14} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;