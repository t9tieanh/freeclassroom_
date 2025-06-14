export const SAVE_OTP = 'SAVE_OTP';
export const Verify_OTP = 'VERIFY_OTP'

export const doSaveOtp = (data) => {
    return {
        type: SAVE_OTP,
        payload: data
    };
};

export const doVerify_OTP = () => {
    return {
        type: Verify_OTP
    };
};