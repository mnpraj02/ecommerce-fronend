import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h1 className="sidebarTitleHello">My Account Details</h1>
          <h1 className="sidebarTitle">Orders</h1>
          <ul className="sidebarList">
            <Link to="/userProfile" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem ">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/present.png`}
                />
                My Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account Settings</h3>
          <ul className="sidebarList">
            <Link
              to="/userProfileInformation"
              style={{ textDecoration: "none" }}
            >
              <li className="sidebarListItem">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/man.png`}
                />
                Profile Information
              </li>
            </Link>
            <Link to="/userProfileAdress" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/location.png`}
                />
                Manage Adresses
              </li>
            </Link>
            <Link to="/userProfilePanCard" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/credit-card.png`}
                />
                Electorent card
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Payment Information</h3>
          <ul className="sidebarList">
            <Link to="/userProfileDebitCard" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/debit-card.png`}
                />
                Saved Cards
              </li>
            </Link>
            <Link to="/userProfileUPI" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/mobile-payment.png`}
                />
                Saved UPI
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Sidebar);
