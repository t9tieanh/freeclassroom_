import './style.scss'
import { useParams } from 'react-router-dom'
import Card from '~/components/common/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from '~/components/common/Breadcrumb';
import PostContent from '~/components/PostPage/Content';
import SideBar from '~/components/PostPage/SideBar';
import { findPostById } from '~/service/post/SectionService';
import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '~/context/PostContext';

const PostPage = () => {
    
    const { post } = useContext(PostContext)

    return <>
        <Breadcrumb
            className='bg-light' 
            items={[{name : 'Trang chủ', path: '/'}, {name: 'Bài viết', path: null}]} 
        />
        <Row className='post-container'>
            <Col xs={2}>
                <SideBar />
            </Col>
            <Col>
                <PostContent title={post?.title} 
                    content={post?.content}
                    createBy={<>{post?.createBy?.name} ({post?.createBy?.email})</>}
                    createDate={post?.createDate}
                    image={post?.createBy?.image}
                />
            </Col>
        </Row>
    </>
}

export default PostPage