import { ADD_PRODUCTS } from "../actions";

export default function products(state = [], action) {
  //{ products:[]}
  switch (action.type) {
    case ADD_PRODUCTS:
      return [...state, action.products];
    default:
      return state;
  }
}
