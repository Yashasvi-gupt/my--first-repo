import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
import SummarizeIcon from '@mui/icons-material/Summarize';


const Nav = () => {
    return (
        <nav>
            <ul className="NavBar">
                <li> <Link className='link' to={'/'} >
                   <ViewQuiltIcon className="circle" />
                </Link><div className='colorfill'></div>
                </li>
                <li> <Link className='link' to={'/Second'}>
                    <RoundaboutLeftIcon  className="circle"/>
                </Link> <div className='colorfill'></div></li>

                <li> <Link className='link' to={'/Third'}>
                    <SummarizeIcon className="circle"/>
                </Link>
                <div className='colorfill'></div></li>
            </ul>
        </nav>
    )
}

export default Nav