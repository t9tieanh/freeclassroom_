import './style.scss'
import Paginate from '../../components/common/paging/Paginate';
import { useEffect, useState } from 'react';
import { getClassRoomByTeacher } from '../../service/class/ClassRoomService';
import SideBar from '../../components/Teacher/SideBar';
import ClassCard from '../../components/ClassList/ClassCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFilter } from 'react-icons/fa';
import Tag from '~/components/common/tag'
import { pagingConfig } from '~/conf/conf';
import CustomBreadcrumb from '~/components/common/Breadcrumb';

const ClassList = () => {

    const [classLst, setClassLst] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [classQuantity, setClassQuantity] = useState(0)

    useEffect(() => {
        fetchClassList(0, pagingConfig.LIMIT)
    }, []); // Dependency array rỗng -> chỉ chạy một lần khi component mount

    const fetchClassList = async(page, limit) => {
        let data = await getClassRoomByTeacher(page, limit)

        if (data && data.code && data.code === 200 && data.result) {
            setClassLst(data.result.classRooms)
            setCurrentPage(data.result.currentPage - 1)
            setClassQuantity(data.result.totalItems)
            setPageCount(data.result.totalPages)
        }
    }

    
    return (
        <>
        <CustomBreadcrumb className={'bg-light'} /> 
        <Row className='bg-light h-100 classroom-list'>
            <Col xs={2}>
                <SideBar className={'wh-100'}  />
            </Col>
            <Col>
            <Container>
                {/* danh sách lớp học */}
                <div className='filter-result mt-2'>
                    <Tag 
                        className={'bg-primary shadow-5'}
                        children={<>
                        <p className='mb-30 ff-montserrat totalcount'><FaFilter />&nbsp;Total Class : {classQuantity}</p>
                        </>}  
                    />

                    {classLst.map((classroom, index) => (
                        <ClassCard key={index} classroom={classroom} index={index} />
                    ))}
                </div>
                {/* phân trang */}
                <nav className='d-flex align-items-center justify-content-center mt-5' aria-label='Page navigation'>
                    <Paginate fetchClassList = {fetchClassList}  itemsPerPage = {pagingConfig.LIMIT} pageCount = {pageCount} currentPage = {currentPage}/>
                </nav>
            </Container>
            </Col>
        </Row>
        </>
    );
}

export default ClassList;
