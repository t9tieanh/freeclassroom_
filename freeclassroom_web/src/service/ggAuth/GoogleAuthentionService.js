import axios from "../../utils/CustomAxios";
import { OAuthConfig } from '../../conf/conf';

const exchangeToken = async (code) => {
    return await axios.get(`auth/oauth/google?code=${code}`);
};


const activeGGAccount = async (image, email, name, phone, username, password, role) => {
    const form = new FormData();
    form.append('image', image);
    form.append('email', email);
    form.append('name',name)
    form.append('phone',phone)
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);

    return await axios.post(`users/active-account`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}


export { exchangeToken, activeGGAccount };
  