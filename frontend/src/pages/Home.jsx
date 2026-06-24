function Home() {
    return (
        <div className="home-page">
            <nav className="navbar">
                <h2 className="logo">JepretYuk</h2>

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Take Photos With Your Favorite Idol
                    </h1>

                    <p className="hero-subtitle">
                        Create aesthetic photobooth memories with idol templates,
                        beauty filters, and customizable photo strips.
                    </p>

                    <Link to="/choose-frame">
                        <button className="start-btn">Start Here</button>
                    </Link>
                </div>
            </section>

            <section id="features" className="section features">
                <h2 className="section-title">Features</h2>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Idol Templates</h3>
                        <p>Pose together with your favorite idol template.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Beauty Filters</h3>
                        <p>
                            Adjust brightness, warmth, glow, and skin smoothness.
                        </p>
                    </div>
                </div>
            </section>

            <section id="about" className="section about">
                <h2 className="section-title">About</h2>

                <p>
                    JepretYuk is a web based photobooth experience that lets users
                    capture photos with idol themed templates, apply beauty filters,
                    and create memorable photobooth strips directly from their browser.
                </p>
            </section>

            <section id="contact" className="section contact">
                <h2 className="section-title">Contact</h2>

                <p>Email: isyarianid2@email.com</p>
                <p>Instagram: @dinda.isyrn</p>
                <p>GitHub: github.com/dndxray</p>
            </section>
        </div>
    );
}