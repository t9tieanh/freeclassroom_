import './style.scss'
import { Badge } from 'react-bootstrap'

const Message = ({isOwn, message}) => {
    return <>
        <div 
            className={`message-container d-flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} 
            justify-content-start mt-3 gap-2`}>
                
            <img src={message?.sender?.avatarUrl}
                alt="avatar 1" width={40} height={40}></img>

            <div>
                <p className='send-date mb-0'>
                    {message?.sender.name} - {message?.sender.username}
                </p>
                <Badge bg={isOwn ? 'primary' : 'light'} className={`message-content text-start ${!isOwn && 'text-black'}`}>
                    {message?.content}
                </Badge>
                <p className='send-date'>
                    {message?.sendDate}
                </p>
            </div>

        </div>
    </>
}

export default Message