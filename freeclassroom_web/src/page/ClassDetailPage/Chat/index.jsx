import './style.scss'
import { Container } from 'react-bootstrap'
import Card from '~/components/common/Card'
import { IoPeopleSharp } from "react-icons/io5";
import Breadcrumb from '~/components/common/Breadcrumb';
import { useContext } from 'react';
import { ClassDetailContext } from '~/context/ClassDetailContext';
import { FaMessage } from "react-icons/fa6";
import ChatContainer from '~/components/ChatPage/ChatContainer';

const ChatPage = () => {

    const { classDetail } = useContext(ClassDetailContext);


    return <>
    <Container className='chat-page'>
        <Card className='p-0'
        name={'Tin nhắn'}
        subTitle={'Đoạn chat trong lớp học này'}
        icon={<FaMessage />}
        children={
            <>
                <Breadcrumb className='mt-3' items={[
                    { name: 'Trang chủ', path: '/' },
                    { name: 'Lớp học của tôi', path: '/class' },
                    { name: 'Chi tiết lớp học', path: `/class-detail/` + classDetail?._id },
                    { name: 'Thành viên', path: `/class-detail/` + classDetail?._id + '/peoples' },
                    { name: 'Tin nhắn', path: null }
                ]}/>
                <ChatContainer />
            </>
        }
    /> 
    </Container>
    </>
}

export default ChatPage