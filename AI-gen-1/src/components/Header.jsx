import './Header.css'

function Header({ isDarkMode }) {
  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-content">
        <p className="eyebrow">AI Productivity Suite</p>
        <h1>Turn everyday writing and communication into AI-powered workflows.</h1>
        <p className="header-text">
          Explore a growing set of practical AI tools for chat, translation, summarizing,
          writing improvement, and polished email creation.
        </p>
        <div className="header-actions">
          <a href="#about" className="btn primary">Explore Tools</a>
          <a href="#contact" className="btn secondary">Contact Us</a>
        </div>
        <div className="hero-highlights">
          <span>⚡ Fast AI responses</span>
          <span>🧠 Multi-tool workflow</span>
          <span>✨ Clean, modern UI</span>
        </div>
      </div>
    </header>
  )
}

export default Header
