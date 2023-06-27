import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const AdminSidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h1 className="sidebarTitleHello">Admin Portal</h1>
          <h1 className="sidebarTitle">Products</h1>
          <ul className="sidebarList">
            <Link to="/Admin" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem ">
                <img
                  alt="sidebar-categories"
                  className="sidebarIcon"
                  style={{ height: 30, width: 30 }}
                  src={process.env.PUBLIC_URL + `/images/present.png`}
                />
                My Products
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
export default connect(mapStateToProps)(AdminSidebar);
