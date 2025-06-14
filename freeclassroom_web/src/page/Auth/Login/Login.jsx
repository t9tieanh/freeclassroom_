import React, { useState } from "react";
import "./Login.scss";
import logo from "../../../assets/media/others/classroom1.png";
import { login } from "../../../service/auth/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../../redux/action/updateUserAction";
import { OAuthConfig } from "../../../conf/conf";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // success, danger, etc.
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // gg authentication 
  const handleContinueWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const callbackUrl = OAuthConfig.redirectUri;
      const authUrl = OAuthConfig.authUri;
      const googleClientId = OAuthConfig.clientId;
  
      const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
      )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
  
      console.log(targetUrl);

      window.location.href = targetUrl;
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login(formData.email, formData.password)
    
    if (data && data.code && data.code == 200 && data?.result?.valid) {
      dispatch(doUpdateUser(data.result))

      setIsLoading(true);
      // toast.success(data.message)
      setTimeout(() => {
          setAlertType("success");
          setAlertMessage(data.message);
          setIsLoading(false); 
          navigate("/");
      }, 2000);

    } else {
      setAlertType("danger")
      setAlertMessage(data.message)
    }
  }


  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={logo}
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={(e) => {handleLogin(e)}}>
              {/* Social Login */}
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <a
                  href="#"
                  onClick={(e) => {handleContinueWithGoogle(e)}}
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </a>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* Email Input */}
              <div className="form-outline input-custom mb-4">
                <input
                  type="text"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>

              {/* Password Input */}
              <div className="form-outline input-custom mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {alertMessage && (
                <div className="form-outline mb-4" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <div className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                {isLoading && <i class="fa-solid fa-spinner loaderIcon" style={{marginRight:"10px"}}> </i>}
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a onClick={() => {navigate("/register")}}  className="text-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
