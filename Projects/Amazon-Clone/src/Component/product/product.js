import React from "react"; 
import './product.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import product from './product.json';
import { useSelector, useDispatch } from "react-redux";
import {addToCart} from '../../redux/action/action';

const List = ["Mobiles & Accessories", "Laptops & Accessories", "TV & Home Entertainment",
    "Audio", "Cameras", "Computer Peripherals", "Smart Technology", "Musical Instruments",
    "Office & Stationary"
]
const Product = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.item);
    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    return (
        <div className="productPage">
            <div className="productTopBanner">
                <div className="productTopBannerItems">
                    Electronics
                </div>
                {
                    List.map((item) => {
                        return (
                            <div className="productTopBannerItemsSubMenu">{item}</div>
                        )
                    })
                }
            </div>

            <div className="productsPageMain">
                <div className="productsPageMainLeftCategory">
                    <div className="productsPageMainLeftCategoryTitle">Category</div>
                    <div className="productsPageMainLeftCategoryContent">
                        <div className="productsPageMainLeftCategoryTitleContent">Computers & Accessories</div>
                        <div className="productsPageMainLeftCategoryContentSub">Macbooks</div>
                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>
                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />

                        </div>
                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <div className="andUp">& Up</div>
                        </div>
                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <div className="andUp">& Up</div>
                        </div>
                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <div className="andUp">& Up</div>
                        </div>
                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                            <div className="andUp">& Up</div>
                        </div>
                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>
                        <div className="productsPageMainLeftCategoryContentSub">Amazon Prime</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                    </div>
                </div>
                <div className="productsPageMainRight">
                    <div className="productsPageMainRightTopBanner">
                        1-5 of 5 results for <span className="productsPageMainRightTopBannerSpan">Macbooks</span>
                    </div>
                    <div className="itemsImageProductPage">
                        {
                            product.product.map((item, ind) => {
                                return(
                                    <div className="itemsImageProductPageOne" key={item.id}>
                                    <div className="imgBlockItemsImageProductPageOne">
                                        <img src={item.imageurl} alt={ind} className="productImageProduct" />
                                    </div>
                                    <div className="productNameProduc">
                                        <div>{item.name}</div>
                                        <div className="productNameProductRating">
                                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                                            <StarRateIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                                            <StarOutlineIcon sx={{ fontsize: "16px", color: "#febd69" }} />
                                        </div>
                                        <div className="priceProductDetailPage">
                                            <div className="currencyText">₹</div>
                                            <div className="rateHomeDetail">
                                                <div className="rateHomeDetailsPrice">{item.price}</div>
                                                <div className="addtobasketBtn" onClick={()=>{handleAddToCart(item)}}>Add To Cart</div>
                                            </div>
                                        </div>
                                        <div className="offProductPage">Upto 10% off</div>
                                        <div className="freeDelivery">Free Delivery by Amazon</div>
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

export default Product