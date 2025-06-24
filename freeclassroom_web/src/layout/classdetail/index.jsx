
import { Outlet } from 'react-router-dom';
import ClassCover from '../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';
import { useState } from 'react';
import { getClassDetail } from '../../service/class/ClassRoomService.js';
import { ClassDetailContext } from '../../context/ClassDetailContext.jsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeacherInfo from '~/components/ClassDetail/TeacherInfo/index.jsx';
import ClassInfo from '~/components/ClassDetail/ClassInfo/index.jsx';

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
            <ClassCover name = {classDetail?.name} cover={classDetail?.coverImage} code={classDetail?.code} />
                <Row className='px-3'> 
                    <Col xl={8}>
                        <TeacherInfo teacher = {classDetail?.teacher}/>
                        <ClassDetailContext.Provider value={{classDetail, fetchClassDetail}}>
                            <Outlet/>
                        </ClassDetailContext.Provider>
                    </Col>
                    <Col>
                        <ClassInfo detail = {classDetail?.detail} unit = {classDetail?.unit} tags = {classDetail?.tags} />
                    </Col>
                </Row>
        </div>
    );
}

export default ClassLayout