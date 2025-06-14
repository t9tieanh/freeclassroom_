import axios from "../../utils/CustomAxios";
import { OAuthConfig } from '../../conf/conf';

const exchangeToken = async (code) => {
    return await axios.post(`auth/outbound/authentication?code=${code}`);
};


const activeGGAccount = async (image, email, name, phone, username, password, role) => {
    const form = new FormData();
    form.append('imageFile', image);
    form.append('email', email);
    form.append('name',name)
    form.append('phone',phone)
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);

    return await axios.post(`auth/outbound/active-account`, form)
}


export { exchangeToken, activeGGAccount };
  