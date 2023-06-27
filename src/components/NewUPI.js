import "../styles/NewUPI.css";
import Sidebar from "./Sidebar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { connect } from "react-redux";
import { handleUser } from "../actions";
import { postUpi } from "../utils/api";

const NewUPI = (props) => {
  //We have different useStates for different areas.

  const [Name, setName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [type, setType] = useState("");
  const [bank, setBank] = useState("");
  const history = useHistory();
  let error = [];

  let newUser = { ...props.user };
  console.log("user is outside", newUser);

  //Updating the state as he enters the data

  const getName = (event) => {
    setName(event.target.value);
  };
  const getCardNo = (event) => {
    setCardNo(event.target.value);
  };
  const getphoneNo = (event) => {
    setPhoneNo(event.target.value);
    !isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))
      ? console.log("Correct number")
      : toast.error("Please enter only numbers") && setPhoneNo("");
  };
  const getType = (event) => {
    setType(event.target.value);
  };
  const getBank = (event) => {
    setBank(event.target.value);
  };

  //Checking validation for different fields.

  const checkValidation = () => {
    if (Name.length <= 6) {
      toast.warning("FullName should be more than 6 characters.");
      error.push("Fullname error");
    }
    if (type.length === 0) {
      toast.warning("Type should not be null");
      error.push("bank type error");
    }
    if (phoneNo.length !== 10) {
      toast.warning("Mobile number should be of length 10");
      error.push("MobileNumber error");
    }
    if (bank.length === 0) {
      toast.warning("Bank cannot be null");
      error.push("bank error");
    }
    if (
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(cardNo)
    ) {
      toast.warning("Enter valid UPI Id");
      error.push("UPI Id error");
    }
  };

  //Submit function which will fire only when all fields are entered.

  const reactOnSubmit = (e) => {
    let newId = Math.ceil(Math.random() * 100);
    checkValidation();
    //      console.log("submit button clicked");
    if (error.length === 0) {
      const data = {
        id: newId,
        avatar:
          "https://play-lh.googleusercontent.com/k7yz57K2OxhNrPNKF2U18Zcv9rodOu7CfWh47U15FFUN8-_B0hQfXsM-BaLG0gOtvw=s180-rw",
        userId: props.user._id,
        userName: Name,
        upiType: type,
        mobileNumber: phoneNo,
        cardNo: cardNo,
      };
        console.log(data);

      // let newArray = [...props.user.upi, data];

      //Add the new adress into the array.

      // newUser.upi = newArray;
      /*       console.log("user after submitting", newUser);
       */
      // let url = "http://localhost:3000/users/" + props.user.id;

      //now patch the new user object.

      postUpi(data)
        .then((data) => {
          console.log("Successfully PATCHED", data);
          props.dispatch(handleUser(props.user._id));
          toast.success("Succesfully Added UPI ", toastStyler);
          setName("");
          setCardNo("");
          setPhoneNo("");
          setType("");
          setBank("");
          history.push("/userProfileUPI");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.error("Form submission failed");
      setName("");
      setCardNo("");
      setPhoneNo("");
      setType("");
      setBank("");
    }

    //make all errors empty again.

    error = [];
  };

  //Returing the actual component

  return (
    <div className="container">
      <Sidebar />
      <div className="newUPI">
        <h1 className="newUserTitle">New UPI</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>UPI Type* (Not empty)</label>
            <input
              type="text"
              placeholder="PayTm"
              onChange={getType}
              value={type}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Name on the UPI* (More than 6 characters)</label>
            <input
              type="text"
              placeholder="John Smith"
              onChange={getName}
              value={Name}
              required
            />
          </div>
          <div className="newUserItem">
            <label>UPI ID* (Valid email)</label>
            <input
              type="email"
              placeholder="georgey75@paytm"
              onChange={getCardNo}
              value={cardNo}
              required
            />
          </div>

          <div className="newUserItem">
            <label>Bank linked (Not empty)</label>
            <input
              type="text"
              placeholder="HDFC"
              onChange={getBank}
              value={bank}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Phone Number* (10 digits without country code)</label>
            <input
              type="text"
              // pattern="[0-9]{2}-[0-9]{5}-[0-9]{5}"
              placeholder="8688275981"
              onChange={getphoneNo}
              value={phoneNo}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Active</label>
            <select className="newUserSelect" name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button
            className="newUserButton"
            onClick={(e) => {
              e.preventDefault();
              reactOnSubmit(e);
            }}
          >
            Create
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
export default connect(mapStateToProps)(NewUPI);
