import Card from '~/components/common/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.scss'
import PrimaryButton from '~/components/common/button/btn-primary';
import { HiPaperAirplane } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const SectionDetail = ({post}) => {

    const navigate = useNavigate()

    return (
        <>
            <Container>
                <Row> 
                    <Col xs={1}>
                        <img 
                            src={`${post?.postType}`}
                            alt='Icon'
                            className='rounded-circle'
                            style={{ width: '40px', height: '40px' }}
                        />
                    </Col>
                    <Col xs={9}>
                        <Card name={post?.title}
                            className={'text-start fs-8'}
                            subTitle={`Ngày đăng: ${post?.createDate}`} 
                            children={
                                <>
                                <div className='text-muted fs-8'>
                                    {post?.description} 
                                </div>
                                </>
                            }
                        />
                    </Col>
                    <Col className='d-flex align-items-center'>
                        <PrimaryButton onClickFunc={() => {navigate(`/post/${post._id}`)}} text={'Chi tiết'} icon={<HiPaperAirplane />} />
                    </Col>
                </Row>
                <hr/>
            </Container>
            
        </>
    );
};
export default SectionDetail;
