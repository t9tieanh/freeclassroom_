import axios from "../../utils/CustomAxios";


const baseURL = "auth/"

const signUp = async (image, email, name, phone, username, password, role) => {
    const form = new FormData();
    form.append('image', image);
    form.append('email', email);
    form.append('name',name)
    form.append('phone',phone)
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);

    return await axios.post(`users/sign-up`, form)
}


const verifyOTPfunc = async (username, otp) => {
    const form = new FormData();
    form.append('username', username);
    form.append('otp', otp);

    return await axios.post(`users/active-account`, form)
}

const login = async (username, password) => {
    return await axios.post(`${baseURL}login`, {username, password})
}

export {signUp, verifyOTPfunc, login}