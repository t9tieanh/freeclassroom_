import axios from "../../utils/CustomAxios";

const baseURL = "section"

const getPostsBySectionId = async (id) => {
    return await axios.get(`${baseURL}/${id}`)
}

export {getPostsBySectionId}
