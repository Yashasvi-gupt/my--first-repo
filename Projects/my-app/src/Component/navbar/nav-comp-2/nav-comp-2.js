import React from 'react';
import './nav-comp-2.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from 'react-router-dom';

const Nav_b = () => {
    const option = [
        { "name": "Fresh" }, { "name": "Amazon Mini-TV" }, { "name": "Sell" },
        { "name": "Best Seller" }, { "name": "Todays Deal" }, { "name": "" },
        { "name": "Mobile" }, { "name": "Prime" }, { "name": "Costomer Service" },
        { "name": "Electronics" }, { "name": "Faction" }, { "name": "House And Kitchen" },
        { "name": "New Releases" }, { "name": "Amazon Pay" }, { "name": "Computers" }
    ]
    return (
        <div className='Nav_b'>
            <div className='NavMenu'>
                <div className='MenuOption' >
                    <MenuOutlinedIcon sx={{ fontSize: "24px" }} />
                    <div className='MenuOptionText'>All</div>
                </div>
                {
                    option.map((item, ind) => {
                        return (
                            <Link to={'/Product'} className='MenuOption' key={ind} >
                                <div className='MenuOptionText'>{item.name}</div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Nav_b