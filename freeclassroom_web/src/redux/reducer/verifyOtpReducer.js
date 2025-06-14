
import { SAVE_OTP, doSaveOtp } from "../action/verifyOtpAction";
import VerifyOTP from "../../page/Auth/VerifyOtp/VerifyOtp";

const INITIAL_STATE = {
    username : ''
};

const verifyOtpReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_OTP:
            return {
                ...state, username : action?.payload,
            };

        case VerifyOTP : 
            return {
                ...state, username : '',
            };
        
        default: return state;
    }
};

export default verifyOtpReducer;