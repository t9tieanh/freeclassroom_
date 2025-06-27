import React from "react";
import logo from "../../../assets/media/others/logo.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector, useDispatch } from "react-redux";
import { doDeleteUser } from "../../../redux/action/updateUserAction";
import { toast } from "react-toastify";
import CustomButton from "../button/btn";
import { CiUser } from "react-icons/ci";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import Tag from '~/components/common/tag'

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
          { isAuthentication && 
                <div className="collapse navbar-collapse" id="navbarNav">
                <div className="container">
                <div className="row align-items-center">
                <ul className="navbar-nav ml-auto" style={{width: "fit-content"}}>
                  <Tag className={'bg-gradient shadow-5 p-2 text-dark rounded-2 fw-bold'}>
                      Xin chào {account.name}
                      <img
                          src={account.image}
                          referrerPolicy="no-referrer"
                          alt="User Avatar"
                          className="ml-3 rounded-circle"
                          width={30}
                          height={30}
                        />
                    </Tag>
                  {/* <li className="nav-item dropdown">
                      <a href="" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i classname="fas fa-plus"></i></a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#"  data-toggle="modal" data-target="#joinClass">Join Class</a>
                      </div>
                  </li> */}
                  <CustomButton variant={'primary'} 
                    className={'text-light ml-3'} text={'Đăng xuất'} 
                    children={<IoLogOut size={20} />}
                    onClickFunc={handleLogout}
                  />
                </ul>
                  </div>
                  </div>
                </div>
          }
          
          { !isAuthentication &&
            <div className="collapse navbar-collapse" id="navbarNav">
              

              <div className="container">
              <div className="row align-items-center">

              <ul className="navbar-nav ml-auto " style={{width: "fit-content"}}>

                <Tag children={'Chào mừng đến với FreeClassRoom'} className={'bg-light shadow-3 p-2 text-dark rounded-2 text-muted'}  />

                <CustomButton variant={'light'} 
                  className={'text-primary ml-3'} text={'Đăng ký'} 
                  children={<CiUser size={20}/>}
                  onClickFunc={() => navigate("/register")}
                />

                <CustomButton variant={'primary'} 
                  className={'text-light ml-3'} text={'Đăng nhập'} 
                  children={<IoLogIn size={20} />}
                  onClickFunc={() => navigate("/login")}
                />  
                </ul>
                
                
                </div>
                </div>
        
            </div>
          }
        </div>
      </nav>
    </>
  );
};

export default Header;
