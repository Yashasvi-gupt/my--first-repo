import React from 'react';
import './navbar.css';
import Nav_a from './nav-comp-1/nav-comp-1';
import Nav_b from './nav-comp-2/nav-comp-2';


const Navbar = () => {
    return (
        <div className='navbar'>
            <Nav_a/>
           <Nav_b/>
        </div>
    )
}

export default Navbar
