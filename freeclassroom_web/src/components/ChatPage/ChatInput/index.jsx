import './style.scss'
import TextInput from '~/components/common/Input/Input2'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SOCKET_EVENTS from '~/utils/socketEvents'
import { useParams } from 'react-router-dom'

const ChatInput = ({socket}) => {
    const [message, setMessage] = useState('')
    const account = useSelector(state => state.account.account)
    
    // dùng use param để lấy classId
    const { classId } = useParams();

    const handleSendMessage = () => {
        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
            classroomId: classId,
            message: message
        })
        setMessage('')
    }

    return <>
    <div className='d-flex gap-3 align-items-center'>
        <img src={account?.image}
            alt="avatar 3" width={40} height={40}></img>
        <TextInput className={'flex-grow-1'} placeholder={'Nhập tin nhắn...'} 
            value={message} setValue={setMessage}
        />
        <a class="ms-3" href="#!" onClick={handleSendMessage}><i class="fas fa-paper-plane"></i></a>
    </div>
    </>
}

export default ChatInput