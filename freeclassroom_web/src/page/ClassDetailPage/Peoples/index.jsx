import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useState } from 'react';
import { ClassDetailContext } from '~/context/ClassDetailContext';
import Breadcrumb from '~/components/common/Breadcrumb';
import { FaInfoCircle } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Container } from 'react-bootstrap';
import './style.scss'
import { getPeoplesByClassRoom } from '~/service/class/ClassRoomService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Card from '~/components/common/Card';
import { IoPeopleSharp } from "react-icons/io5";

const PeopleClassDetail = () => {

    const { classDetail } = useContext(ClassDetailContext);
    // dùng use param để lấy classId
    const { classId } = useParams();

    const [ students, setStudents ] = useState([])

    useEffect(
        () => {
            fetchPeoplesByClassRoom(classId)
        }
    ,[])

    const fetchPeoplesByClassRoom = async (classId) => {
        const data = await getPeoplesByClassRoom(classId)
        if (data && data.code && data.code === 200) {
            // set students
            setStudents(data.result)
        } else if (data.response && data.response.data) {
            toast.error(data.response.data.message)
        } else toast.error(data?.message)
    }

    return <>
    <Card className='p-0 people-class-detail'
        name={'Thành viên'}
        subTitle={'Các thành viên có trong lớp học'}
        icon={<IoPeopleSharp />}
        children={
            <>
            <Breadcrumb className='mt-3' items={[
                { name: 'Trang chủ', path: '/' },
                { name: 'Lớp học của tôi', path: '/class' },
                { name: 'Chi tiết lớp học', path: `/class-detail/` + classDetail?._id },
                { name: 'Thành viên', path: null }
            ]}/>

            <Table striped bordered hover className='align-middle mb-0 bg-white mt-4'>
                <thead>
                    <tr>
                    <th><FaInfoCircle />Thông tin cơ bản</th>
                    <th><FaPhoneFlip/>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        students?.map((student) => 
                            <>
                                <tr>
                                    <td className='d-flex align-items-center'>
                                        <img
                                            src={student?.image}
                                            alt=""
                                            style={{width: 45, height: 45}}
                                            className="rounded-circle"
                                        />
                                        <div class="ms-3">
                                            <p class="fw-bold mb-1">{student?.name}</p>
                                            <p class="text-muted mb-0">{student?.email}</p>
                                        </div>
                                    </td>
                                    <td>{student?.phone}</td>
                                </tr>
                            </>
                        ) 
                    }
                    {students?.length === 0 && (
                        <h5 className='fs-6 my-2 ml-2'>Hiện tại lớp học này chưa có học sinh tham gia !</h5>
                    )}
                </tbody>
            </Table>
            </>
        }
    
    /> 
    </>
}

export default PeopleClassDetail