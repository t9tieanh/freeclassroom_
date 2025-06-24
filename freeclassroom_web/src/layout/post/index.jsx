
import { Outlet } from 'react-router-dom';
import Cover from '../../components/ClassDetail/ClassCover/index.jsx';
import './style.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findPostById } from '~/service/post/SectionService.js';
import { PostContext } from '~/context/PostContext.jsx';

const PostLayout = () => {

    const { postId } = useParams()
    
    const [post, setPost] = useState()

    // gọi api khi render 
    useEffect(
        () => {
            fetchFindPostById(postId)
        }
        ,[])

    // Gọi api lấy dữ liệu của post
    const fetchFindPostById = async(id) => {
        const data = await findPostById(id)

        if (data && data.code && data.code === 200 && data.result) {
            setPost(data.result)
        }
    }


    return <>
        <div className='post-page'>
            <Cover name={post?.title} />
            <PostContext.Provider value={{post}}>
                <Outlet/>
            </PostContext.Provider>
        </div>
    </>
}

export default PostLayout