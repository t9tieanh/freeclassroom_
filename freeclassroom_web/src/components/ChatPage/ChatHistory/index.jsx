import './style.scss'
import { Container } from 'react-bootstrap'
import Message from '../Message'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getChatHistory } from '~/service/class/ClassRoomService'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const ChatHistory = ({className, socket}) => {

    // dùng use param để lấy classId
    const { classId } = useParams();

    // mesage list 
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const account = useSelector(state => state.account.account)

    // bắt sự kiện nhận message
    useEffect(
        () => {
            socket.on('new-message',(msg) => {
                setArrivalMessage(msg)
            })

            // get chat History 
            fetchChatHistory()
        },[])

    const fetchChatHistory = async () => {
        const data = await getChatHistory(classId)
        if (data && data.code && data.code === 200 && data?.result) {
            setMessages(data.result)
        } else if (data.response && data.response.data) {
            toast.error(data.response.data.message)
        } else toast.error(data?.message)
    }

    useEffect(
        () => {
            if (arrivalMessage) {
                setMessages((prev) => [...prev, arrivalMessage])
                setArrivalMessage(null)
                console.log(messages)
            }
        } ,[arrivalMessage])

    return <Container className='chat-history-container mt-2'>
        {messages.map((message, index) => {
            return <div key={index}>
                <Message isOwn={account?.username !== message?.sender?.username} message = {message} />
            </div>
        })}
    </Container>
}

export default ChatHistory