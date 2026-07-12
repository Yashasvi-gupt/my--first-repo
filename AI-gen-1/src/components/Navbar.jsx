import './Navbar.css'

function Navbar({ isDarkMode, onToggleTheme }) {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="brand">AI Gen</div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button
          type="button"
          className="theme-toggle nav-theme-toggle"
          onClick={onToggleTheme}
          aria-pressed={isDarkMode}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
