import "../styles/NewCard.css";
import Sidebar from "./Sidebar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { connect } from "react-redux";
import { handleUser } from "../actions";
import { postCard } from "../utils/api";

const NewCard = (props) => {
  const history = useHistory();
  //We have different useStates for different areas.

  const [Name, setName] = useState("");
  const [cardNo, setcardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [type, setType] = useState("");
  const [cvv, setCvv] = useState("");

  let newUser = { ...props.user };
  let error = [];

  //Updating the state as he enters the data

  const getName = (event) => {
    setName(event.target.value);
  };
  const getcardNo = (event) => {
    setcardNo(event.target.value);
    !isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))
      ? console.log("Correct number")
      : toast.error("Please enter only numbers") && setcardNo("");
  };
  const getExpiry = (event) => {
    setExpiry(event.target.value);
  };
  const getCvv = (event) => {
    setCvv(event.target.value);
  };
  const getType = (event) => {
    setType(event.target.value);
  };

  //Chekhing validation
  const checkValidation = () => {
    if (Name.length <= 6) {
      toast.warning("FullName should be more than 6 characters.");
      error.push("Fullname error");
    }
    if (type.length === 0) {
      toast.warning("Type should not be null");
      error.push("bank type error");
    }
    if (cardNo.length !== 10) {
      toast.warning("Card number should be of length 10");
      error.push("Card Number error");
    }
    if (cvv.length !== 3) {
      toast.warning("Cvv should be 3 numbers");
      error.push("Cvv error");
    }
  };

  //Submit function which will fire only when errors are empty.

  const handleSubmit = (e) => {
    let newId = Math.ceil(Math.random() * 100);
    checkValidation();

    if (error.length === 0) {
      const data = {
        id: newId,
        avatar:
          "https://banksifsccode.com/blog/media/2020-03/how-to-login-to-union-bank-s-net-banking-account-step-4.jpg",
        userId: props.user._id,
        cardType: type,
        cardNo: cardNo,
        cvv: cvv,
        expiry: expiry,
        nameOnCard: Name,
      };

      //newUser.debitCards.push(data);
      //adding the new debit card.
      // let newArray = [...props.user.debitCards, data];

      // newUser.debitCards = newArray;

      // let url = "http://localhost:8000/api/users" + props.user._id;
      //Fetching the data with post method

      postCard(data)
        .then((data) => {
          console.log("Successfully PATCHED", data);
          props.dispatch(handleUser(props.user._id));
          toast.success("Succesfully added Debit Card", toastStyler);
          setName("");
          setcardNo("");
          setExpiry("");
          setType("");
          setCvv("");
          history.push("/userProfileDebitCard");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Form submission failed");
        });
    } else {
      toast.error("Form submission failed");
      setName("");
      setcardNo("");
      setExpiry("");
      setType("");
      setCvv("");
    }

    error = [];
  };

  //Returing the actual component

  return (
    <div className="container">
      <Sidebar />
      <div className="newCard">
        <h1 className="newUserTitle">New Card</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Card Type* (Not empty)</label>
            <input
              type="text"
              placeholder="Axis Bank"
              onChange={getType}
              value={type}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Name on the Card* (More than 6 characters)</label>
            <input
              type="text"
              placeholder="John Smith"
              onChange={getName}
              value={Name}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Expiry Date*</label>
            <input
              type="month"
              placeholder="10/2022"
              onChange={getExpiry}
              value={expiry}
              required
            />
          </div>

          <div className="newUserItem">
            <label>CVV (Must be 3 numbers)</label>
            <input
              type="number"
              placeholder="498 "
              onChange={getCvv}
              value={cvv}
              required
            />
          </div>
          <div className="newUserItem">
            <label>Card Number* (10 Numbers)</label>
            <input
              type="text"
              placeholder="1234567890"
              onChange={getcardNo}
              value={cardNo}
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
export default connect(mapStateToProps)(NewCard);
