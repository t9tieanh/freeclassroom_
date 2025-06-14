import axios from "../../utils/CustomAxios";

const baseURL = "classroom"

const getClassRoomByTeacher = async (page,limit) => {
    return await axios.get(baseURL,{
        params: {
            page: page,
            limit: limit
        }
    })
}

const getClassDetail = async (id) => {
    return await axios.get(`${baseURL}/${id}`)
}

export {getClassRoomByTeacher, getClassDetail}