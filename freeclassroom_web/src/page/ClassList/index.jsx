import './style.scss'
import Paginate from '../../components/common/paging/Paginate';
import { useEffect, useState } from 'react';
import { getClassRoomByTeacher } from '../../service/class/ClassRoomService';
import { Link, useNavigate } from "react-router-dom";
import SideBar from '../../components/Teacher/SideBar';
import ClassCard from '../../components/ClassList/ClassCard';
import SearchInput from '../../components/ClassList/SearchInput';

export const LOCAL_HOST = "http://localhost:8080/freeclassroom"
export const LIMIT = 3

const ClassList = () => {

    const [classLst, setClassLst] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [classQuantity, setClassQuantity] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        fetchClassList(0, LIMIT)
    }, []); // Dependency array rỗng -> chỉ chạy một lần khi component mount

    const fetchClassList = async(page, limit) => {
        let data = await getClassRoomByTeacher(page,limit)

        if (data && data.code && data.code === 200 && data.result) {
            setClassLst(data.result.content)
            setCurrentPage(data.result.pageable.pageNumber)
            setClassQuantity(data.result.totalElements)
            setPageCount(data.result.totalPages)
        }
    }

    
    return (
        <>
            <div className='class-list-content row full-width'>

                <div className='side-bar col-2'>
                    <SideBar/>
                </div>

                <div className='main-content col-10'>
                    <div className="row title">
                        <div className="col-lg-11 mx-auto mb-4">
                            <div className="section-title text-center">
                            <h3 className='font-weight-bold'>
                            YOUR CLASS
                            <small class="text-muted font-weight-bold">@freeclassroom
                                _phamtienanh</small>
                            </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="career-search mb-60">
                                <SearchInput />
                                <div className="filter-result">
                                    <p className="mb-30 ff-montserrat totalcount"><i class="fa-solid fa-filter"></i>&nbsp;Total Class : {classQuantity}</p>


                                    {classLst.map((classroom, index) => (
                                        <ClassCard key={index} classroom={classroom} index={index} />
                                    ))}

                                </div>
                            </div>
                            <nav className='paginate-container' aria-label="Page navigation">
                                <Paginate fetchClassList = {fetchClassList}  itemsPerPage = {LIMIT} pageCount = {pageCount} currentPage = {currentPage}/>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>   
        </>
    );
}

export default ClassList;
