
import { Outlet } from 'react-router-dom';
import ClassCover from '../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';
import { useState } from 'react';
import { getClassDetail } from '../../service/class/ClassRoomService.js';
import { ClassDetailContext } from '../../context/ClassDetailContext.jsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ClassLayout = () => {

    // dùng use param để lấy classId
    const { classId } = useParams();

    useEffect(() => {
        fetchClassDetail(classId)
    }, []);

    const [classDetail, setClassDetail] = useState();

    // lấy dữ liệu classroom
    const fetchClassDetail = async (id) => {
        let data = await getClassDetail(id)
        
        if (data && data.code && data.code === 200 && data.result) {
            setClassDetail(data.result)
        }
    }

    return (
        <div>
            <ClassCover name = {classDetail?.name} cover={classDetail?.coverImage} />
            <ClassDetailContext.Provider value={{classDetail, fetchClassDetail}}>
                <Outlet/>
            </ClassDetailContext.Provider>
        </div>
    );
}

export default ClassLayout