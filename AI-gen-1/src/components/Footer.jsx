import './Footer.css'

function Footer({ isDarkMode }) {
  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`} id="contact">
      <div>
        <h3>Ready to build with AI?</h3>
        <p>Bring intelligent features into your next app with a clean, scalable workflow.</p>
      </div>
      <a href="mailto:hello@aitoolsdemo.com" className="footer-link">hello@aitoolsdemo.com</a>
    </footer>
  )
}

export default Footer
