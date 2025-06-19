import { useState, useRef } from "react";
import "./style.scss";
import OtpInput from 'react-verify-otp';
import '../../../../node_modules/react-verify-otp/dist/style.css'
import { verifyOTPfunc } from "../../../service/auth/AuthenticationService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doVerify_OTP } from "../../../redux/action/verifyOtpAction";


const VerifyOTP = () => {

    const username = useSelector(state => state.userVerifyOtp.username);

    const otpRef = useRef(null);
    const [otp, setOtp] = useState('');
    const [isLoadingVerify, setIsLoadingVerify] = useState(false)
    const navigator = useNavigate()
    const dispatch = useDispatch ()

    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };

    const isValidOTP = (otp) => /^\d{4}$/.test(otp);

    const handleSubmitVerifyOtp = async() => {

        if (!username) {
            toast.error("You have not created an account yet.");
            return 
        }

        if (!isValidOTP(otp)) {
            toast.error("You have not entered all 4 digits");
            return 
        }

        setIsLoadingVerify(true) // setloading

        const data = await verifyOTPfunc(username,otp)

        setIsLoadingVerify(false)

        if (data && data.code && data.code == 200){
            dispatch(doVerify_OTP())
            toast.success(data.message)
            navigator("/")
        }
        else {
            toast.error(data.message)
            setOtp('')
        }
    }
    

    return <div className="verify-otp-container row">

        <div className="col align-self-center">

            <div className="card text-center form-otp hover-shadow">
                <div className="card-header">VERIFY OTP</div>
                <i class="fa-solid fa-shield-halved"></i>
                <div className="card-body">
                    <h5 className="card-title">Enter the 4-digit verification code that was sent to your phone number</h5>


                    <div className="verify-otp-input">
                    <OtpInput
                        ref={otpRef}
                        otpValue={otp}
                        onChange={handleChangeOtp}
                        separator={'♦'}
                        shouldAutoFocus={true}
                        inputType="number"
                    />
                    </div>

                    <a href="#" className="btn btn-primary" data-mdb-ripple-init onClick={handleSubmitVerifyOtp}>
                        {isLoadingVerify && <i class="fa-solid fa-spinner loaderIcon" style={{marginRight:"10px"}}> </i>} 
                        Verify OTP</a>
                    <p className="card-text">Didn't receive code ? <span className="high-ligt-text"> Resend here</span></p>
                </div>
                <div className="card-footer text-muted">OTP exprire on 2 date</div>
            </div>


        </div>
    
    </div>
}

export default VerifyOTP