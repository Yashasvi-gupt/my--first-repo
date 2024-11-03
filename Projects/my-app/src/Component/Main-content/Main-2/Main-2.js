import React from 'react';
import './Main-2.css';
import asdd from '../../../asdd.json';

const Main_2 = () => {
    return (
        <div className='homeDetails'>
            <div className="homeDetailLongcard">
                <div className="homeDetailLongCardTitle">Today's Deals</div>
                <div className="homeDetailLongCardItems">


                    <div className="scrollDiv">
                        {
                            asdd.ProductTwo.map((item, ind) => {
                                return (
                                    <div className="homeDetailLongCardItem">
                                        <img className="homeDetailLongCardItemImg" alt={ind} src={item.img} />

                                        <div className="homeDetailLongCardItemImgDetail">
                                            <div className="homeDetailLongCardItemImgTopDetail">
                                                <div className="homeDetailPercentageOff">
                                                    Up to 20% off
                                                </div>
                                                <div className="limitedTimeDealhomeDetail">
                                                    Limited Time Deal
                                                </div>
                                            </div>
                                            <div className='BottomDetail'>{item.Title} </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <div className="homeDetailLongcard">
                <div className="homeDetailLongCardTitle">Today's Deals</div>
                <div className="homeDetailLongCardItems">


                    <div className="scrollDiv">
                        {
                            asdd.ProductTwo.map((item, ind) => {
                                return (
                                    <div className="homeDetailLongCardItem">
                                        <img className="homeDetailLongCardItemImg" alt={ind} src={item.img} />

                                        <div className="homeDetailLongCardItemImgDetail">
                                            <div className="homeDetailLongCardItemImgTopDetail">
                                                <div className="homeDetailPercentageOff">
                                                    Up to 20% off
                                                </div>
                                                <div className="limitedTimeDealhomeDetail">
                                                    Limited Time Deal
                                                </div>
                                            </div>
                                            <div className='BottomDetail'>{item.Title} </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main_2
