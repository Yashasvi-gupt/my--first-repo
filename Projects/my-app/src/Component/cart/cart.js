import React, {useEffect, useState} from "react";
import './cart.css';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/action/action";

const Cart = () => {
const [cartItem, setcartItems]= useState([]);
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);

const handleRemoveFromCart = (id) => {

    dispatch(removeFromCart(id));
}

let a = 0;
let cost = cartItems.map((item) => {return a=a+item.price})

useEffect(()=>{
    setcartItems(cartItems);
},[cartItems])
    return (
        <div className="cart">

            <div className="topLeftcart">
                <div className="topLeftCartTitle">Shopping Cart</div>
                <div className="desellectAllCart">Deselect all items</div>
                <div className="cartPriceTextDivider">Price</div>


                <div className="cartItemsDiv">
                   {
                    cartItems.map((item, ind) => 
                    {
                        return(
                            <div className="cartItemBlock">
                            <div className="cartItemLeftBlock">
                                <div className="cartItemLeftBlockImage">
                                    <img className="cartItemLeftBlockImg" alt="img" src={item.imageurl} />
                                </div>
                                <div className="cartItemLeftBlockDetails">
                                    <div className="cartItemProductName">{item.name}</div>
                                    <div className="inStockCart">In stock</div>
                                    <div className="elgFreeShp">Elligible for FREE Shopping</div>
                                    <div className="amazonFullfilledImage"><img className='fullfilling' src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png' alt="img" /></div>
                                    <div className="removeFromCart" onClick={() => {handleRemoveFromCart(item.id)}}>Remove From Basket</div>
                                </div>
                            </div>
                            <div className="cartItemRightBlock">
                                Rs {item.price}
                            </div>
                        </div>
                        );
                    })
                   }
                </div>

            </div>
            <div className="topRightCart">
                <div className="subTotalTitle"> Subtotal ({cartItem.length} items): <span className="subTotalTitlespan">Rs {a}</span></div>
                <div className="giftAddto">
                    <input alt="checkbox" type='checkbox' />
                    <div>This Order Contains a gift</div>
                </div>
                <div className="proceedToBuy">Proceed to Buy</div>
            </div>
        </div>
    )
}

export default Cart