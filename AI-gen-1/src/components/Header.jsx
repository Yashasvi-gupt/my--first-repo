import './Header.css'

function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Simple AI Landing Page</p>
        <h1>Build smarter experiences with AI.</h1>
        <p className="header-text">
          This homepage shows a clean layout with navigation, a welcoming hero section,
          useful content, and a polished footer.
        </p>
        <div className="header-actions">
          <a href="#about" className="btn primary">Explore More</a>
          <a href="#contact" className="btn secondary">Get in Touch</a>
        </div>
      </div>
    </header>
  )
}

export default Header
