import './style.scss';
import freeclassroom from '../../assets/media/others/classroom3.png';
import PrimaryButton from '~/components/common/button/btn-primary'
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {

    const navigator = useNavigate()
    const isAuthentication = useSelector(state => state.account.isAuthentication)

    return ( 
        <Container>
            <Row>
                <Col className='main_section mt-5'>
                    <h5>Chào mừng bạn đến với</h5>
                    <h1> Free Classroom</h1>
                    <span>
                        Nơi bạn có thể <strong>Học tập</strong> <br />Và chia sẻ <strong>Kiến thức</strong>
                    </span>
                    <br />
                    <hr />
                    { isAuthentication && 
                        <>
                            <PrimaryButton text={'Lớp học của tôi'} 
                                icon={<SiGoogleclassroom />}
                                onClickFunc={() => navigator('/class')} 
                            />
                        </>
                    }
                </Col>
                <Col>
                    <img className='mt-5' src = {freeclassroom} alt="Classroom" />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
