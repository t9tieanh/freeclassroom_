import './style.scss'
import Card from '~/components/common/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaCodeBranch } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const TeacherInfo = ({teacher}) => {
    return (
        <>
            <Row className='align-items-stretch mt-4'>
                <Col xs={3} >
                    <Card icon={<FaChalkboardTeacher />} className={'text-muted'} name={'Giáo viên'}
                        children={   
                            <div className="text-center border-end">
                                <img
                                    src={`${teacher?.image}`}
                                    className="img-fluid avatar-xxl rounded-circle"
                                    alt="User Avatar"
                                />
                                <h4 className="text-primary font-size-20 mt-3 mb-2">
                                    {teacher?.name}
                                </h4>
                                <h5 className="text-muted font-size-13 mb-0">{teacher?.position}</h5>
                            </div>
                        }   
                    />
                </Col>
                <Col>
                    <Card icon={<FaInfoCircle/>} className={'text-muted'} name={'Thông tin giáo viên'} 
                        subTitle={'Thông tin giáo viên của khóa học này'} 
                        children={
                            <div className='teacher-description font-size-10'>
                                <Row className='mb-1'>
                                    <Col xs='3'><CiUser/>Họ và tên: </Col>
                                    <Col>{teacher?.name}</Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col xs='3'><FaCodeBranch/>Lĩnh vực: </Col>
                                    <Col>{teacher?.position}</Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col xs='3'><MdAttachEmail/>Email liên hệ: </Col>
                                    <Col>{teacher?.email}</Col>
                                </Row>
                                <Row>
                                    <Col xs='3'><FaPhone />Số điện thoại: </Col>
                                    <Col>{teacher?.phone}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs='3'>Mô tả: </Col>
                                    <Col>{teacher?.description}</Col>
                                </Row>
                            </div>
                        }
                    />
                </Col>
            </Row>
        </>
    )
}

export default TeacherInfo