import './style.scss'
import { Container } from 'react-bootstrap'
import Message from '../Message'

const ChatHistory = ({className}) => {
    return <Container className='chat-history-container'>
        <Message isOwn={true} />
        <Message />
    </Container>
}

export default ChatHistory