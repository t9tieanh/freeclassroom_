
import { Outlet } from 'react-router-dom';
import Cover from '../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';

const PostLayout = () => {
    return <>
        <div className='post-page'>
            <Cover name={'Bài đăng đầu tiên !!!'} />
            <Outlet/>
        </div>
    </>
}

export default PostLayout