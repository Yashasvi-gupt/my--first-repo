import React from 'react';
import './Main-1.css';
import asdd from '../../../asdd.json'

const Main_1 = () => {
    return (
        <div className='HomeScreenImg'>
            <div className='HomeScreenImg_1'>
            <img className='homeImg' alt='HomeImg' src='https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/urec/hero/Under1499_Tallhero_3000x1200._CB568928188_.jpg' />
            </div>
            <div className='grayEnd'></div>
            <div className='HomeItem'>
               {
                 asdd.Product.map((item, ind) => {   
                    return (
                        <div className='ItemCard'>
                        <div className='ItemCardTitle'>{item.itemTitle}</div>
                        <div className='ItemCardImg'>
                            {
                                item.img.map((it, ind) => {
                                    return (
                                        <div className='ForImg'>
                                        <img className='ImgCard_1' src={it} alt={ind}/>
                                        <div className='AboutImg'>Cushion covers, bedsheets & more</div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                         <div className='SeeMore'>See More</div>
                    </div>
                    )                 
                 }
               )}
              
            </div>
        </div>
    )
}

export default Main_1
