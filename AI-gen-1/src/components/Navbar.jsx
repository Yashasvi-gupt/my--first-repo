import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">AI Gen</div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
