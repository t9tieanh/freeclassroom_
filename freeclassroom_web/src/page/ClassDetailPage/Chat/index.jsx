import './style.scss'
import { Container } from 'react-bootstrap'
import Card from '~/components/common/Card'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import Breadcrumb from '~/components/common/Breadcrumb';
import { useContext } from 'react';
import { ClassDetailContext } from '~/context/ClassDetailContext';
import { FaMessage } from "react-icons/fa6";
import ChatContainer from '~/components/ChatPage/ChatContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SOCKET_EVENTS from '~/utils/socketEvents';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

const ChatPage = () => {

    const navigate = useNavigate()

    // dùng use param để lấy classId
    const { classId } = useParams();

    const { classDetail } = useContext(ClassDetailContext);
    const accessToken = useSelector(state => state.account.account.accessToken)

    // chưa đăng nhập
    if (!accessToken)
        navigate(`/class-detail/${classId}`)

    const userToken = `Bearer ${accessToken}`; 
    const host = 'http://localhost:8017/classroom'
    
    // Kết nối namespace /classroom, kèm auth
    const socketRef = useRef();

    // dùng để check trạng thái socket 
    const [ready, setReady] = useState(false);

    useEffect(
            () => {
                socketRef.current = io(host, {
                    auth: {
                        token: userToken
                    }
                });

                socketRef.current.on(SOCKET_EVENTS.CONNECT, () => {
                    // Join vào lớp học
                    socketRef.current.emit(SOCKET_EVENTS.JOIN_CLASSROOM, classId);
                });

                socketRef.current.on(SOCKET_EVENTS.ERROR, (err) => {
                    navigate(`/class-detail/${classId}`)
                    toast.error('Bạn chưa tham gia khóa học này !')
                })

                setReady(true);

            }, [userToken, classId]
        )

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
                {ready  && <ChatContainer socket={socketRef.current} />}
            </>
        }
    /> 
    </Container>
    </>
}

export default ChatPage