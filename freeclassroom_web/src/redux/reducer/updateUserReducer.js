
import {  UPDATE_USER } from "../action/updateUserAction";
import { DeleteUser } from "../action/updateUserAction";
import { UPDATE_TOKEN } from "../action/updateToken";

const INITIAL_STATE = {
    account : {
        accessToken: "",
        refreshToken : "",
        username: "",
        image: "",
        email: "",
        role: "",
    },
    isAuthentication : false
};

const updateUserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state, account : {
                    accessToken: action.payload.accessToken,
                    refreshToken : action.payload.refreshToken,
                    username : action.payload.username, 
                    email : action.payload.email, 
                    image : action.payload.image,
                    role : action.payload.role, 
                }, 
                isAuthentication : action.payload.isValid
            };
        
        case DeleteUser: 
            return {
                ...state, account : INITIAL_STATE.account, isAuthentication: false 
            }

        case UPDATE_TOKEN:
            return {
                ...state, 
                account: {
                    ...state.account, // Giữ nguyên các thuộc tính khác của account
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                }, 
            }

        default: return state;
    }
};

export default updateUserReducer;