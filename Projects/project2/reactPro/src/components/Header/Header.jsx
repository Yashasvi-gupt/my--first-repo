import React from "react"
import './Header.css'
import GoogleIcon from '@mui/icons-material/Google';

function Header() {
    return (
       <header className="header">
        {/*<PublicIcon />*/}
        <GoogleIcon />
        <h3 className="name">My Travel </h3>
       </header>
    )
}

export default Header 