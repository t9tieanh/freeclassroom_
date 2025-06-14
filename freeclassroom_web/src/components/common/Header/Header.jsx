import React from "react";
import logo from "../../../assets/media/others/logo.png";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import "./Header.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector, useDispatch } from "react-redux";
import { doDeleteUser } from "../../../redux/action/updateUserAction";
import { toast } from "react-toastify";


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthentication = useSelector(state => state.account.isAuthentication)
  const account = useSelector(state => state.account.account)

  const handleLogout = () => {
    dispatch(doDeleteUser())
    toast.success("Log out success")
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo" alt="logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          { isAuthentication && 

                <div className="collapse navbar-collapse" id="navbarNav">
                              

                <div className="container">
                <div className="row align-items-center">

                <ul className="navbar-nav ml-auto" style={{width: "fit-content"}}>

                  <li className="nav-item col">
                    <a className="nav-link" href="#" tabindex="-1" aria-disabled="true" style={{width: "200px"}}>Welcome {account.username}</a>
                  </li>

                  <li className="nav-item dropdown">
                      <a href="" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i classname="fas fa-plus"></i></a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#"  data-toggle="modal" data-target="#joinClass">Join Class</a>
                      </div>
                  </li>

                  <li class="nav-item" onClick={handleLogout}>
                      <a class="nav-link"> <i class="fas fa-power-off"></i> Logout</a>
                  </li>


                </ul>
                  
                  
                  </div>
                  </div>

                </div>



          }
          
          { !isAuthentication &&
            <div className="collapse navbar-collapse" id="navbarNav">
              

              <div className="container">
              <div className="row align-items-center">

              <ul className="navbar-nav ml-auto" style={{width: "fit-content"}}>

              <li className="nav-item col" >
                  <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true" style={{width: "220px"}}>
                    Welcome to freeclassroom
                  </a>
                </li>

                  <li className="nav-item active col nav-signup" onClick={() => navigate("/register")}>
                    <i className="fas fa-user-plus"></i> Sign up
                  </li>
                  <li className="nav-item active col" onClick={() => navigate("/login")}>
                      <i className="fas fa-sign-in-alt" ></i> Login
                  </li>
                  </ul>
                
                
                </div>
                </div>
        
            </div>
          }
        </div>
      </nav>

      {/* Modal */}
      <div
        className="modal fade"
        id="joinClass"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Paste The Code to join
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="/join" method="POST">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder="Enter the Code"
                  />
                </div>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
