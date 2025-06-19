import SectionComponent from '../../components/ClassDetail/Section/index.jsx'
import TeacherInfo from '../../components/ClassDetail/TeacherInfo/index.jsx'
import ClassInfo from '../../components/ClassDetail/ClassInfo/index.jsx'
import NavBarComponent from '../../components/ClassDetail/NavBar/index.jsx'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ClassDetailContext } from '../../context/ClassDetailContext.jsx'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '~/components/common/Card'

const ClassDetail = () => {
    const { id } = useParams();
    const { classDetail, fetchClassDetail } = useContext(ClassDetailContext);

    useEffect(() => {
        fetchClassDetail(id)
    }, []);

    return <>
        <Row> 
            <Col xl={8}>

                <TeacherInfo teacher = {classDetail?.teacher}/>
                <Card 
                    name={'Chương trình học'}
                    subTitle={'Chi tiết về chương trình học'}
                    className={'mt-3'}
                    children={
                        <>
                        <div className='card text-center'>
                            <div className='card-header'>
                                <NavBarComponent/>
                            </div>
                            <div className='card-body'>
                                {
                                    classDetail?.sections.map((section, index) => (
                                        <div style={{width: '100%'}} key={index}>
                                            <SectionComponent index={index} section = {section} />
                                        </div>
                                    ))
                                    
                                }
                            </div>
                        </div>
                        </>
                    }
                />
            </Col>
            <Col>
                <ClassInfo detail = {classDetail?.detail} unit = {classDetail?.unit} tags = {classDetail?.tags} />
            </Col>
        </Row>
    </>
}

export default ClassDetail