import './style.scss'
import { useParams } from 'react-router-dom'
import Card from '~/components/common/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from '../../components/Teacher/SideBar';
import Breadcrumb from '~/components/common/Breadcrumb';
import PostContent from '~/components/PostPage/Content';


const PostPage = () => {
    const { postId } = useParams()

    return <>
        <Row className='post-container'>
            <Col xs={2}>
                <SideBar />
            </Col>
            <Col>
                <Breadcrumb
                    className='bg-light' 
                    items={[{name : 'Trang chủ', path: '/'}, {name: 'Bài viết', path: null}]} 
                />
                <PostContent />
            </Col>
        </Row>
    </>
}

export default PostPage