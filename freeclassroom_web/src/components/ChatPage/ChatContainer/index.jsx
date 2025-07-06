import ChatHistory from '../ChatHistory'
import ChatInput from '../ChatInput'
import './style.scss'
import { Row } from 'react-bootstrap'

const ChatContainer = () => {
    return <>
        <div className='d-flex flex-column chat-container'>
            <ChatHistory />
            <div class="mt-auto p-2 bg-light">
                <ChatInput />
            </div>
        </div>
    </>
}

export default ChatContainer