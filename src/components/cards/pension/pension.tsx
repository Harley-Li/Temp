import React from 'react';
import './index.scss';

const PensionDashboard: React.FC = () => {
    return (
        <div className="card combined-pension-card">
            <div className="card-section overview-section">
                <div>
                    <div className="card-subtitle">BBC Pension Scheme (AVC)</div>
                    <div className="small-text">
                        Fidelity reference number: <strong>C040350</strong>
                    </div>
                </div>
                <div className="overview-value-block">
                    <div className="large-value">£71,563.39</div>
                    <div className="small-text">Total plan value as of 26 May 2025</div>
                    <a href="#" className="call-to-action">
                        View investment overview →
                    </a>
                </div>
            </div>

            <div className="card-section performance-section">
                <h3 className="card-title">Investment Performance</h3>
                <div className="card-item">
                    <div className="info-text">
                        Rate of return <span>26 May 2024 to 26 May 2025</span>
                    </div>
                    <div className="value-indicator positive">+0.75%</div>
                </div>

                <div className="card-item ">
                    <div className="info-text">
                        Change in investment <span>26 May 2024 to 26 May 2025</span>
                    </div>
                    <div className="value-indicator positive">+£532.78</div>
                </div>

                <a href="#" className="call-to-action">
                    View plan performance →
                </a>
            </div>

            <div className="card-section contributions-section">
                <h3 className="card-title">Recent Contributions</h3>
                <div className="card-item">
                    <div className="info-text">Your last contribution:</div>
                    <div className="value-indicator positive">N/A</div>
                </div>

                <div className="card-item ">
                    <div className="info-text">
                        Employer's last contribution: <span>made on 03 Jun 2024</span>
                    </div>
                    <div className="value-indicator positive">+£752.33</div>
                </div>

                <a href="#" className="call-to-action">
                    View all contributions →
                </a>
            </div>
        </div>
    );
};

export default PensionDashboard;
