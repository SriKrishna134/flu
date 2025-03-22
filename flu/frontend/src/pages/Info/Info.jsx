import React from "react";
import { useNavigate } from "react-router-dom";
import "./Info.css";
import heroImage from "../../assets/mobile.jpg";

const Info = () => {
    const navigate = useNavigate();

    return (
        <div className="info-container">
            <div className="hero-section">
                <div className="text-content">
                    <h1>Collabs Made Easy. Growth Made Inevitable.</h1>
                    <p>
                        We bridge the gap between brands and influencers, making collaborations 
                        effortless and impactful. The right match, the right time, no hassle, just results.
                    </p>
                    <div className="input-group">
                        <input type="email" placeholder="Enter your email" />
                        <button onClick={() => navigate("/survey")}>Get Started</button>
                    </div>
                </div>
                <div className="image-content">
                    <img src={heroImage} alt="Influencer" />
                </div>
            </div>

            <section className="what-we-do">
                <h2>What We Do</h2>
                <div className="features">
                    <div className="feature-card">
                        <h3>Influencer Discovery & Matching</h3>
                        <p>We use AI-powered solutions to match influencers based on industry, engagement, and audience.</p>
                        <img src="/info1.png" alt="Influencer Matching" />
                    </div>
                    <div className="feature-card">
                        <h3>Performance Analytics</h3>
                        <p>Data-driven insights to maximize engagement, ROI, and campaign success.</p>
                        <img src="/info2.png" alt="Performance Analytics" />
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Make Powerful Collaborations?</h2>
                <p>
                    Join the ultimate influencer-brand marketplace and take your marketing 
                    game to the next level! Sign up now and start connecting in minutes!
                </p>
                <button className="signup-btn" onClick={() => navigate("/survey")}>Register</button>
            </section>
        </div>
    );
};

export default Info;
