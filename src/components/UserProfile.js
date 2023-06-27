import "../styles/myprofile.css";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getMyOrders } from "../utils/api";

//This page renders all Myorders
const UserProfile = (props) => {
  const [data, setData] = useState([]);
  //We get the user from the store.

  //We set the existing data.
  useEffect(() => {
    if (props.user._id) {
      getMyOrders(props.user._id).then((res) => {
        let newArray = res.data.userOrders;
        newArray.forEach((address) => {
          address.id = address._id.toString();
          address.type = address.productId.type;
          address.category = address.productId.category;
          address.discount = address.productId.discount;
          address.price = address.productId.price;
        });
        setData(newArray);
      });
    }
  }, [props.user.myOrders]);

  //Column headings
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "user",
      headerName: "Name of Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.productId.image[0]}
              alt=""
            />

            {params.row.productId.productName}
          </div>
        );
      },
    },

    {
      field: "type",
      headerName: "Type",
      width: 80,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/reviewform",
                state: { productId: params.row.productId._id },
              }}
            >
              <button className="userListEdit">Post Review</button>
            </Link>
          </>
        );
      },
    },
  ];

  //We see if the user is authorised.
  const { authorized } = props;
  if (!authorized) {
    return <Redirect to="/login" />;
  }

  //rendering the data grid.
  return (
    <div className="container">
      <Sidebar />
      <div className="myOrders">
        <div className="userTitleContainer">
          <h1 className="userTitle">My Orders</h1>
          <Link to="/">
            <button className="userAddButton">Continue Shopping</button>
          </Link>
        </div>
        <DataGrid
          GridLines="None"
          rowHeight={80}
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            boxShadow: 20,
            borderBottom: "none",
            borderRadius: 7,
          }}
        />
      </div>
    </div>
  );
};

//Getting the user from store as props.
function mapStateToProps(state) {
  return {
    user: state.user.userData,
    authorized: state.user.isLoggedIn,
  };
}
export default connect(mapStateToProps)(UserProfile);
