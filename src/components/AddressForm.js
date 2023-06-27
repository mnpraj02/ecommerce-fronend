import React, { useState } from "react";

function AddressForm(props) {
  const productId = props.productId;
  const [newAddress, setNewAddress] = useState({
    Name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phoneNo: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const addAddress = (e) => {
    // console.log(newAddress);
    fetch(`http://localhost:3000/users/${productId}/deliveryAdress`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewAddress({
      Name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      phoneNo: "",
      zip: "",
    });
    e.preventDefault();
  };
  return (
    <div className="form-parent">
      <form action="">
        <div className="form-content">
          <h2>Billing Address</h2>
          <label for="fname">
            <i className="fa fa-user"></i> Full Name
          </label>
          <input
            type="text"
            id="fname"
            name="Name"
            placeholder="Sravan Kumar"
            onChange={handleChange}
            value={newAddress.Name}
            required
          />
          <label for="email">
            <i className="fa fa-envelope"></i> Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="sravan@example.com"
            onChange={handleChange}
            value={newAddress.email}
            required
          />
          <label for="adr">
            <i className="fa fa-address-card-o"></i> Address
          </label>
          <input
            type="text"
            id="adr"
            name="address"
            placeholder="542 W. 15th Street"
            onChange={handleChange}
            value={newAddress.address}
            required
          />
          <label for="city">
            <i className="fa fa-institution"></i> City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Hyderabad"
            onChange={handleChange}
            value={newAddress.city}
            required
          />

          <label for="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Telangana"
            onChange={handleChange}
            value={newAddress.state}
            required
          />

          <label for="zip">Pincode</label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="500007"
            onChange={handleChange}
            value={newAddress.zip}
            required
          />

          <label for="phoneNo">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            placeholder="9989486489"
            onChange={handleChange}
            value={newAddress.phoneNo}
            required
          />
        </div>

        <button onClick={addAddress} className="btn">
          Add Address
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
