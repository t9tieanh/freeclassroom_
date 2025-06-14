
import { Outlet } from 'react-router-dom';
import SideBar from '../../../components/Teacher/SideBar';
import ClassCover from '../../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';
import { useState } from 'react';
import { getClassDetail } from '../../../service/class/ClassRoomService';
import { ClassDetailContext } from '../../../context/ClassDetailContext.jsx';

const ClassLayout = () => {

    const [classDetail, setClassDetail] = useState();

    

    

    const fetchClassDetail = async (id) => {
        let data = await getClassDetail(id)
        
        if (data && data.code && data.code === 200 && data.result) {
            setClassDetail(data.result)
        }
    }


    return (
        <div className='class-list-content row full-width'>

            <div className='side-bar col-2'>
                <SideBar/>
            </div>

            <div className='main-content col-10'>
                <ClassCover name = {classDetail?.name} />

                <ClassDetailContext.Provider value={{classDetail, fetchClassDetail}}>
                    <Outlet/>
                </ClassDetailContext.Provider>
            </div>
            
        </div>
    );
}

export default ClassLayout