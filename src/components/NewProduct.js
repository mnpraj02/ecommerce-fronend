import "../styles/NewCard.css";
import AdminSidebar from "./AdminSidebar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment"; // eslint-disable-line
import { connect } from "react-redux";
import { createProduct } from "../utils/api";

const NewProduct = (props) => {
  const history = useHistory();
  //We have different useStates for different areas.
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  let newUser = { ...props.user };
  let error = [];

  //Updating the state as he enters the data

  const getImage = (event) => {
    setImage(event.target.value);
  };
  const getproductName = (event) => {
    setProductName(event.target.value);
  };
  const getdescription = (event) => {
    setDescription(event.target.value);
  };
  const getquantity = (event) => {
    setQuantity(event.target.value);
  };
  const getprice = (event) => {
    setPrice(event.target.value);
  };
  const getdiscount = (event) => {
    setDiscount(event.target.value);
  };
  const getcategory = (event) => {
    setCategory(event.target.value);
  };
  const gettype = (event) => {
    setType(event.target.value);
  };

  //Submit function which will fire only when errors are empty.

  const handleSubmit = (e) => {
    let newId = Math.ceil(Math.random() * 100);

    if (error.length === 0) {
      const data = {
        productName,
        type,
        discount,
        price,
        quantity,
        category,
        image,
        description,
      };
      console.log(data);
      createProduct(data)
        .then((data) => {
          console.log("Successfully added", data);
          // props.dispatch(handleUser(props.user._id));
          // toast.success("Succesfully added Debit Card", toastStyler);
          // setProductName("");
          // setQuantity("");
          // setCategory("");
          // setType("");
          // setPrice("");
          // setDiscount("");
          // history.push("/Admin");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Form submission failed");
        });
    } else {
      toast.error("Form submission failed");
      setImage("");
      setProductName("");
      setQuantity("");
      setCategory("");
      setType("");
      setDiscount("");
      setPrice("");
    }

    error = [];
  };

  //Returing the actual component

  return (
    <div className="container">
      <AdminSidebar />
      <div className="newCard">
        <h1 className="newUserTitle">ProductDetails</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>ProductName* </label>
            <input
              type="text"
              placeholder="Chetan Guduru"
              onChange={getproductName}
              value={productName}
              required
            />
          </div>
          <div className="newUserItem">
            <label>ProductImage* </label>
            <input
              type="text"
              placeholder="Link"
              onChange={getImage}
              value={image}
              required
            />
          </div>
          <div className="newUserItem">
            <label>ProductDescription* </label>
            <input
              type="text"
              placeholder="Puma bags for trekking"
              onChange={getdescription}
              value={description}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Quantity* </label>
            <input
              type="Number"
              placeholder="5"
              onChange={getquantity}
              value={quantity}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Price*</label>
            <input
              type="Number"
              placeholder="1200"
              onChange={getprice}
              value={price}
              required
            />
          </div>

          <div className="newUserItem">
            <label>Category</label>
            <input
              type="text"
              placeholder="Men/women "
              onChange={getcategory}
              value={category}
              required
            />
          </div>
          <div className="newUserItem">
            <label>discount</label>
            <input
              type="Number"
              placeholder="120"
              onChange={getdiscount}
              value={discount}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Type</label>
            <input
              type="text"
              placeholder=""
              onChange={gettype}
              value={type}
              required
            />
          </div>

          <button
            className="newUserButton"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

//gettin user as props from the store.
function mapStateToProps(state) {
  return {
    user: state.user.userData,
  };
}
export default connect(mapStateToProps)(NewProduct);
