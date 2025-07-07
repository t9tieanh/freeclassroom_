import ChatHistory from '../ChatHistory'
import ChatInput from '../ChatInput'
import './style.scss'

const ChatContainer = ({socket}) => {
    return <>
        <div className='d-flex flex-column chat-container'>
            <ChatHistory socket={socket} />
            <div class="mt-auto p-2 bg-light">
                <ChatInput socket={socket} />
            </div>
        </div>
    </>
}

export default ChatContainer