import Card from '~/components/common/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.scss'
import PrimaryButton from '~/components/common/button/btn-primary';

const SectionDetail = ({post}) => {
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
                                    {post?.content} 
                                </div>
                                </>
                            }
                        />
                    </Col>
                    <Col>
                        <PrimaryButton text={'Chi tiết'} />
                    </Col>
                </Row>
            </Container>
            
        </>
    );
};
export default SectionDetail;
