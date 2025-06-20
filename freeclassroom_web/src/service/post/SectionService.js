import axios from "../../utils/CustomAxios";

const baseURL = "post"

const getPostsBySectionId = async (id) => {
    return await axios.get(`${baseURL}/${id}`)
}

export {getPostsBySectionId}
