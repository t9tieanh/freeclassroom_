import { Link } from "react-router-dom";
import PrimaryButton from "~/components/common/button/btn-primary";
import { HiPaperAirplane } from "react-icons/hi2";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import './style.scss'

const ClassCard = ({classroom, index}) => {
    return (
        <>
        <Row className="mt-2 hover-shadow p-2 rounded-4 class-card">
            <Col xs={2}>
                <img 
                    src={`${classroom?.coverImage}`} 
                    alt={`Ảnh của ${classroom?.coverImage}`} 
                    className="img-fluid"
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                />
            </Col>
            <Col xs={8}>
                <div className="d-flex flex-column justify-content-center h-100">
                    <h5 className="fw-bold mb-2">{classroom?.name}</h5>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-1">
                            <i className="zmdi zmdi-pin me-2 text-muted"></i>
                            <MdClass /> Chủ đề: {classroom?.unit}
                        </li>
                        <li className="mb-1">
                            <i className="zmdi zmdi-account me-2 text-muted"></i>
                            <FaChalkboardTeacher /> Giáo viên: {classroom?.teacher?.name}
                        </li>
                    </ul>
                </div>
            </Col>
            <Col className='d-flex align-items-center'>
                <Link to={`/class-detail/${classroom?._id}`}>
                    <PrimaryButton text={'Xem chi tiết'} icon={<HiPaperAirplane />} />
                </Link>
            </Col>
        </Row>
        </>
    )

}

export default ClassCard;