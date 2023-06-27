import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  EMPTY_CART,
} from "../actions/Types";

// initial state
const initialState = {
  cart: [],
};
function findItemAndSetState(state, item) {
  // finds if the item is in the cart and
  //  if the item is found the increase the qty
  // if not found then add the product with  qty=1
  let itemFound = false;
  for (let i of state.cart) {
    if (i._id.toString() === item._id.toString()) {
      itemFound = true;
      i.qty += 1;
    }
  }
  if (!itemFound) {
    state = { ...state, cart: [...state.cart, { ...item, qty: 1 }] };
  }
  return state;
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return findItemAndSetState(state, action.payload.item);
    case REMOVE_FROM_CART:
      // removes the item from the cart
      return {
        ...state,
        cart: state.cart.filter((item) => item !== action.payload.item),
      };
    case INCREMENT:
      // increases the qty
      return {
        ...state,
        cart: state.cart.map((item) =>
          item === action.payload.item
            ? { ...item, qty: action.payload.item.qty + 1 }
            : item
        ),
      };
    // decreases the qty
    case DECREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item === action.payload.item
            ? {
                ...item,
                qty:
                  action.payload.item.qty !== 1
                    ? action.payload.item.qty - 1
                    : 1,
              }
            : item
        ),
      };
    case EMPTY_CART:
      // empty cart items array
      return initialState;
    default:
  }
  return state;
};
export default cartReducer;
