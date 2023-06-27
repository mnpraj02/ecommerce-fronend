import axios from "axios";

// all the code for the api requests
export function getAllProducts() {
  return axios.get("/product");
}

// get product by product id
export function getOneProduct(productId) {
  return axios.get(`/product/${productId}`);
}
// creates a product
export function createProduct(details) {
  return axios.post(`/product/`, details);
}

// updates a product
export function updateProduct(productId, details) {
  return axios.patch(`/product/${productId}`, details);
}

// deletes a product
export function deleteProduct(productId) {
  return axios.delete(`/product/${productId}`);
}
// create a user
export function createUser(userDetails) {
  return axios.post("/user", userDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

// get one user
export function getUserById(userId) {
  return axios.get(`/user/${userId}`);
}

export function queryEmail(emailId) {
  return axios.get(`/user?email=${emailId}`);
}

// post a review
export function updateUser(userId, userDetails) {
  // console.log(userDetails);`
  return axios.patch(`/user/${userId}`, userDetails, {
    headers: {
      Accept: "multipart/form-data",
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}
export function getReviews(productId) {
  return axios.get(`/review/${productId}`);
}
export function postReview(reviewDetails) {
  return axios.post("/review", reviewDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

// get all faq
export function getFaqs(productId) {
  return axios.get(`/faq/${productId}`);
}

// get all address
export function getAddresses(userId) {
  return axios.get(`/address/${userId}`);
}

// get all orders
export function getMyOrders(userId) {
  return axios.get(`/orders/${userId}`);
}

export function getDeliveryAddress(userId) {
  return axios.get(`/address/${userId}`);
}

export function postDeliveryAddress(addressDetails) {
  return axios.post("/address", addressDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function updateDeliveryAddress(addressId) {
  return axios.patch(`/address/${addressId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function deleteDeliveryAddress(addressId) {
  return axios.delete(`/address/${addressId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function getCards(userId) {
  return axios.get(`/debitcard/user/${userId}`);
}

export function postCard(cardDetails) {
  return axios.post("/debitcard", cardDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function updateCard(cardId) {
  return axios.patch(`/debitcard/${cardId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function deleteCard(cardId) {
  return axios.delete(`/debitcard/${cardId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function getUpi(userId) {
  return axios.get(`/upi/user/${userId}`);
}
export function postUpi(upiDetails) {
  return axios.post("/upi", upiDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}
export function updateUpi(upiId) {
  return axios.patch(`/upi/${upiId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}
export function deleteUpi(upiId) {
  return axios.delete(`/upi/${upiId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}

export function postOrder(orderDetails) {
  return axios.post("/orders", orderDetails, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("JWTToken"),
    },
  });
}
