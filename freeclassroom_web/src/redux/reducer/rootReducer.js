import { combineReducers } from 'redux';
import verifyOtpReducer from './verifyOtpReducer';
import updateUserReducer from './updateUserReducer';

const rootReducer = combineReducers({
    userVerifyOtp: verifyOtpReducer,
    account: updateUserReducer,
});

export default rootReducer;