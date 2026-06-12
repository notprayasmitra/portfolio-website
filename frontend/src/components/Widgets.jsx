import "../styles/components/homepage-widgets.css"

import { FaCalendar } from "react-icons/fa6";

function Widgets() {
    return (
        <div className="widgets-wrapper">
            {/* Upper Row: 3 Equal-Sized Widgets */}
            <div className="widgets-top-row">
                <div className="widget-small">
                    <p className="widget-title">✦ Widget One</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Hello World!</span> Text</p>
                        <p className="commit-item"><span className="accent">Lorem</span> ipsum...</p>
                    </div>
                </div>

                <div className="widget-small">
                    <p className="widget-title">✦ Let's Connect</p>
                    <div className="widget-content">
                        <p className="connect-tagline">
                            Always open to interesting projects and conversations.
                        </p>
                    </div>
                    <a href="https://cal.com/notprayasmitra/15-min-chat" target="_blank" rel="noreferrer" className="book-chat-btn"><FaCalendar /> Book a Chat</a>
                </div>

                <div className="widget-small">
                    <p className="widget-title">✦ Widget Three</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Hello World!</span> Text</p>
                        <p className="commit-item"><span className="accent">Lorem</span> ipsum...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Widgets;