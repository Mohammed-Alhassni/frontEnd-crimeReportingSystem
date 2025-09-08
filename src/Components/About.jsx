import '../styles/about.css';
import { Link } from 'react-router-dom';

function About(){
    return (
        <div className='aboutContainer'>
            <div className="about-hero">
                <div className="about-icon">
                    🚨
                </div>
                <h1 className="about-title">CrimeWatch</h1>
                <p className="about-subtitle">Community Safety Through Technology</p>
                <p className="about-description">
                    An innovative platform designed to enhance community safety by providing 
                    real-time crime reporting and visualization tools. Built with modern web 
                    technologies to serve and protect our neighborhoods.
                </p>
            </div>

            <div className="about-stats">
                <div className="stat-card">
                    <h3 className="stat-number">24/7</h3>
                    <p className="stat-label">Monitoring</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-number">100%</h3>
                    <p className="stat-label">Secure</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-number">Real-time</h3>
                    <p className="stat-label">Updates</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-number">Community</h3>
                    <p className="stat-label">Driven</p>
                </div>
            </div>

            <div className="about-cards">
                <div className="about-card">
                    <span className="card-icon">🗺️</span>
                    <h3 className="card-title">Interactive Crime Map</h3>
                    <p className="card-description">
                        Visualize crime incidents on an interactive map with detailed information, 
                        search capabilities, and real-time filtering options to stay informed 
                        about your neighborhood's safety.
                    </p>
                </div>

                <div className="about-card">
                    <span className="card-icon">📝</span>
                    <h3 className="card-title">Easy Reporting</h3>
                    <p className="card-description">
                        Report incidents quickly and efficiently with our user-friendly form. 
                        Include detailed descriptions, location data, and supporting information 
                        to help authorities respond effectively.
                    </p>
                </div>

                <div className="about-card">
                    <span className="card-icon">📊</span>
                    <h3 className="card-title">Data Analytics</h3>
                    <p className="card-description">
                        Access comprehensive analytics and insights about crime patterns, trends, 
                        and statistics to better understand safety concerns in your area and 
                        make informed decisions.
                    </p>
                </div>
            </div>

            <div className="about-team">
                <h3 className="team-title">
                    <span>👨‍💻</span>
                    Development Team
                </h3>
                <p className="team-description">
                    This project was developed as part of the <strong>CodestStacker Challenge by Rihal</strong>, 
                    showcasing modern web development practices and innovative solutions for community safety.
                </p>
                <div className="team-members">
                    <div className="team-member">
                        <span>👤</span>
                        <span>Mohammed Alhassni</span>
                    </div>
                    <div className="team-member">
                        <span>🏢</span>
                        <span>Rihal Challenge</span>
                    </div>
                    <div className="team-member">
                        <span>💼</span>
                        <a 
                            href="https://www.linkedin.com/in/mohammed-al-hassni-38a84b2b1" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            LinkedIn Profile
                        </a>
                    </div>
                </div>
            </div>

            <div className="about-cta">
                <h3 className="cta-title">🚀 Ready to Make a Difference?</h3>
                <p className="cta-description">
                    Join our community in making neighborhoods safer. Report incidents, 
                    stay informed, and help create a secure environment for everyone.
                </p>
                <Link to="/ReportSubmission" className="cta-button">
                    <span>📝</span>
                    Report an Incident
                </Link>
            </div>

            <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
            }}>
                <p style={{ margin: 0 }}>
                    <strong>⚠️ Important Notice:</strong> This is a demonstration project. 
                    All crime data displayed is simulated and does not reflect real-world incidents. 
                    For actual emergencies, please contact your local authorities.
                </p>
            </div>
        </div>
    );
}

export default About;