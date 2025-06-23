
import { PENDING_USERNAME } from '../action/verifyOtpAction';

const INITIAL_STATE = {
    username : null,
    expireDateTime : null,
};

const verifyOtpReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case PENDING_USERNAME: 
            return {
                ...state, username : action?.payload.username,
                expireDateTime : new Date(action?.payload?.expireDateTime),
            };
        
        default: return state;
    }
};

export default verifyOtpReducer;