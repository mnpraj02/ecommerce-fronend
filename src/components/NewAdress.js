import "../styles/NewAdress.css";
import Sidebar from "./Sidebar";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { connect } from "react-redux";
import { handleUser } from "../actions";
import { postDeliveryAddress } from "../utils/api";

const NewAdress = (props) => {
  //We have different useStates for different areas.
  const history = useHistory();
  const [Name, setName] = useState("");
  const [locationName, setlocationName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [userName, setuserName] = useState("");

  let error = [];
  //Updating the state as he enters the data
  const getName = (event) => {
    setName(event.target.value);
  };
  const getUserName = (event) => {
    setuserName(event.target.value);
  };
  const getlocationName = (event) => {
    setlocationName(event.target.value);
  };
  const getPinCode = (event) => {
    setPincode(event.target.value);
  };
  const getphoneNo = (event) => {
    //Dont let user enter numbers.
    setPhoneNo(event.target.value);
    !isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))
      ? console.log("Correct number")
      : toast.error("Please enter only numbers") && setPhoneNo("");
  };
  const getAdress = (event) => {
    setAddress(event.target.value);
  };

  //Checking validation for different fields.
  const checkValidation = () => {
    if (Name.length <= 6) {
      toast.warning("FullName should be more than 6 characters.");
      error.push("Fullname error");
    }
    if (userName.length <= 4) {
      toast.warning("UserName should be more than 4 characters.");
      error.push("Username error");
    }
    if (locationName.length === 0) {
      toast.warning("FullName should be more than 4 characters.");
      error.push("Username error");
    }
    if (phoneNo.length !== 10) {
      toast.warning("Mobile number should be of length 10");
      error.push("MobileNumber error");
    }
    if (address.length === 0) {
      toast.warning("Adress cannot be empty");
      error.push("Adress error");
    }
  };

  //Submit function which will fire only when all fields are entered.
  const handleSubmit = (e) => {
    checkValidation();
    if (error.length === 0) {
      const data = {
        userId: props.user._id,
        avatar: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        userName: Name,
        locationName: locationName,
        mobileNumber: phoneNo,
        address: address,
        pincode: pincode,
      };
      console.log(data);

      postDeliveryAddress(data)
        .then((data) => {
          console.log("Successfully ADDED", data);
          props.dispatch(handleUser(props.user._id));
          toast.success("Address Added", toastStyler);
          setName("");
          setlocationName("");
          setPhoneNo("");
          setAddress("");
          setPincode("");
          setuserName("");
          history.push("/userProfileAdress");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Form submission failed");
        });
    } else {
      toast.error("Form submission failed");
      setName("");
      setlocationName("");
      setPhoneNo("");
      setAddress("");
      setPincode("");
      setuserName("");
    }
    error = [];
  };

  //Returing the actual component
  return (
    <div className="container">
      <Sidebar />
      <div className="newAdress">
        <h1 className="newUserTitle">New Adress</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username (More than 4 characters)</label>
            <input
              type="text"
              placeholder="john"
              onChange={getUserName}
              value={userName}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Full Name* (More than 6 characters)</label>
            <input
              type="text"
              placeholder="John Smith"
              onChange={getName}
              value={Name}
              required
            />
          </div>
          <div className="newUserItem">
            <label>PinCode (Any valid PinCode)</label>
            <input
              type="text"
              placeholder="533003"
              onChange={getPinCode}
              value={pincode}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Title of Adress* (Should not be empty)</label>
            <input
              type="text"
              placeholder="My Home"
              onChange={getlocationName}
              value={locationName}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Phone* (10 numbers without country code)</label>
            <input
              type="text"
              placeholder="8688275981"
              onChange={getphoneNo}
              value={phoneNo}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Address* (Should not be null)</label>
            <input
              type="text"
              placeholder="New York | USA"
              onChange={getAdress}
              value={address}
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
            Add Adress
          </button>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.userData,
  };
}
export default connect(mapStateToProps)(NewAdress);
