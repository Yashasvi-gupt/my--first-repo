import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={`homepage ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((value) => !value)} />
      <Header isDarkMode={isDarkMode} />
      <Body isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default App
