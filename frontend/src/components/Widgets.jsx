import "../styles/components/homepage-widgets.css"

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
                    <p className="widget-title">✦ Widget Two</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Hello World!</span> Text</p>
                        <p className="commit-item"><span className="accent">Lorem</span> ipsum...</p>
                    </div>
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