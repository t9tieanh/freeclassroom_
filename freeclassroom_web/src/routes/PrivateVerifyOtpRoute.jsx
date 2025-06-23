import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateVerifyOtpRoute = ({ children }) => {
  const username = useSelector(state => state.userVerifyOtp.username);
  if (!username) {
      toast.error("Bạn chưa đăng ký tài khoản !")
      return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateVerifyOtpRoute;