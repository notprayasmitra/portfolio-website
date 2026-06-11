function Widgets() {
    return (
        <div className="widgets-wrapper">
            {/* Upper Row: 3 Equal-Sized Widgets */}
            <div className="widgets-top-row">
                <div className="widget-small">
                    <p className="widget-title">✦ Widget One</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Stat:</span> Metric Value</p>
                        <p className="commit-item"><span className="accent">Status:</span> Active</p>
                    </div>
                </div>

                <div className="widget-small">
                    <p className="widget-title">✦ Widget Two</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Stat:</span> Metric Value</p>
                        <p className="commit-item"><span className="accent">Status:</span> Operational</p>
                    </div>
                </div>

                <div className="widget-small">
                    <p className="widget-title">✦ Widget Three</p>
                    <div className="widget-content">
                        <p className="commit-item"><span className="accent">Stat:</span> Metric Value</p>
                        <p className="commit-item"><span className="accent">Status:</span> Standby</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Widgets;