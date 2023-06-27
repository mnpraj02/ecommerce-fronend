import { SEARCH_PRODUCTS } from "../actions";

export default function search(state = [], action) {
  //{ searchItems:[]}
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return action.products || [];
    default:
      return state;
  }
}
