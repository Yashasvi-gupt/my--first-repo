import React, { useState } from 'react';
import './nav-comp-1.css';
import amazonLogo from '../../../Assets/amazonLogo.jpg';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import flag from '../../../Assets/flag.png';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav_a = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className='Nav_a'>
            <div className='Nav_a_left'>
                <Link to={'/'} className='NavLeftLogo'>
                    <img className='amazonLogoNav' src={amazonLogo} alt='amazonlogo' />
                </Link>
                <div className='NavLocation'>
                    <div className='NavLocationIcon'>
                        <LocationOnOutlinedIcon className='LocationIcon' sx={{ fontSize: "22px" }} />
                    </div>
                    <div className='NavLocationPlace'>
                        <div className='NavLocationPlaceTop'>
                            Delivery to Rishikesh 249201
                        </div>
                        <div className='NavLocationPlaceBottom'>
                            Update Location
                        </div>
                    </div>
                </div>
            </div>
            <div className='Nav_a_center'>
                <div className='NavSearch'>
                    <div className='NavSearchAll'>
                        <div className='AllText'>All</div>
                        <ArrowDropDownOutlinedIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <input type='text' className='SearchInputBox' placeholder='Search Amazon.in' />
                    <div className='NavSearchIcon'>
                        <SearchOutlinedIcon sx={{ fontSize: "26px" }} className='SearchIcon' />
                    </div>
                </div>
            </div>
            <div className='Nav_a_right'>
                <div className='NavLangChoose a'>
                    <img src={flag} className='Flag' alt="flag" />
                    <div className='chooseLang'>EN<ArrowDropDownOutlinedIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: -0.4 }}
                        className='LangDropDown' /></div>
                </div>
                <div className='NavSigneIn a'>
                    <div className='NavSigneInHello'>Hello, User</div>
                    <div className=' NavSigneInList chooseLang'> Account & List,</div>
                </div>
                <div className='NavSigneIn a'>
                    <div className='NavSigneInHello'>Returns</div>
                    <div className=' NavSigneInList chooseLang'> & Oders,</div>
                </div>
                <Link to={'/cart'} className='NavSigneIn a'>
                    <span className='OnCart'>{cartItems.length}</span>
                    <div className='Cart'><ShoppingCartOutlinedIcon /><span className='CartTitle'>Cart</span></div>
                </Link>
                <MenuOutlinedIcon className='Menu-Icon' onClick={toggleDropdown} />
                <div className={`Dropdown ${dropdownVisible ? 'Showe' : ''}`}>
                    <div className='dropdownContent'>
                        <Link to='/profile'>Profile</Link>
                    </div>
                    <div className='dropdownContent'>
                        <Link to='/orders'>Orders</Link>
                    </div>
                    <div className='dropdownContent'>
                        <Link to='/logout'>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav_a;
