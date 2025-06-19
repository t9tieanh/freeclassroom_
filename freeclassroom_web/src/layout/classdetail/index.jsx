
import { Outlet } from 'react-router-dom';
import ClassCover from '../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';
import { useState } from 'react';
import { getClassDetail } from '../../service/class/ClassRoomService.js';
import { ClassDetailContext } from '../../context/ClassDetailContext.jsx';

const ClassLayout = () => {
    const [classDetail, setClassDetail] = useState();
    const fetchClassDetail = async (id) => {
        let data = await getClassDetail(id)
        
        if (data && data.code && data.code === 200 && data.result) {
            setClassDetail(data.result)
        }
    }

    return (
        <div className='row p-3'>
            <ClassCover name = {classDetail?.name} cover={classDetail?.coverImage} />
            <ClassDetailContext.Provider value={{classDetail, fetchClassDetail}}>
                <Outlet/>
            </ClassDetailContext.Provider>
        </div>
    );
}

export default ClassLayout