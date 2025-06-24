import axios from "../../utils/CustomAxios";

const baseURL = "post"

const getPostsBySectionId = async (id) => {
    return await axios.get(`${baseURL}/section/${id}`)
}

const findPostById = async (id) => {
    return await axios.get(`${baseURL}/${id}`)
}

export {getPostsBySectionId, findPostById}
