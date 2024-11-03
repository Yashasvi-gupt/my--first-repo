import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART } from "../actionType";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId
});

export const updateCartQuantity = (itemId, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { itemId, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});