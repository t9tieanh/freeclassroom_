import axios from "../../utils/CustomAxios";


const baseURL = "auth/"

const signUp = async (image, email, name, phone, username, password, role) => {
    const form = new FormData();
    form.append('imageFile', image);
    form.append('email', email);
    form.append('name',name)
    form.append('phone',phone)
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);

    return await axios.post(`${baseURL}sign-up`, form)
}


const verifyOTPfunc = async (username, otp) => {
    return await axios.post(`${baseURL}verify-otp`, {username, otp})
}

const login = async (username, password) => {
    return await axios.post(`${baseURL}login`, {username, password})
}

export {signUp, verifyOTPfunc, login}