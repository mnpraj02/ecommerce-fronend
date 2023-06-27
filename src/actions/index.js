import axios from "axios";
import { getUserById } from "../utils/api";

export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const SET_USER = "SET_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export function addProducts(products) {
  return {
    type: SEARCH_PRODUCTS,
    products,
  };
}
export function userLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function userLogout() {
  return {
    type: LOGOUT,
  };
}
export function handleUser(userId) {
  // fetch req to get the user details
  // const url = `http://localhost:3000/users?email=${email}`;
  return function (dispatch) {
    // fetch(url)
    getUserById(userId).then((result) => {
      // console.log(result.data.data);
      // dispatch the user method
      dispatch(userLogin(result.data.data));
    });
  };
}
export function handleCategorySearch(searchWord) {
  // fetch req using the search word
  return function (dispatch) {
    // fetch(url)
    axios(`/product/category/${searchWord}`).then((result) => {
      // dispatch the products
      dispatch(addProducts(result.data.products));
    });
  };
}

export function handleCategoryFilter(searchWord) {
  const url = `http://localhost:3000/products${searchWord}`;
  console.log("URL: ", url);
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log(products);

        // dispatch the products
        dispatch(addProducts(products));
      });
  };
}
export function renderallProducts() {
  const url = `http://localhost:3000/products`;
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log(products);

        // dispatch the products
        dispatch(addProducts(products));
      });
  };
}
export function handleProductSearch(products) {
  // const url = `http://localhost:3000/products?q=${searchWord}`;
  // return function (dispatch) {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((products) => {
  //       console.log(products);

  //       // dispatch the products
  //       dispatch(addProducts(products));
  //     });
  // };
  return addProducts(products);
}
