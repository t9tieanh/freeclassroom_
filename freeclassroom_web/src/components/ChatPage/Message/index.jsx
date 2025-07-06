import './style.scss'
import { Badge } from 'react-bootstrap'

const Message = ({isOwn}) => {
    return <>
        <div 
            className={`message-container d-flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} 
            justify-content-start mt-3 gap-2`}>
                
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1" width={40} height={40}></img>

            <div>
                <Badge bg={isOwn ? 'primary' : 'light'} className={`message-content text-start ${!isOwn && 'text-black'}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum saepe facilis, dolorum minus fugiat, qui deleniti natus a dicta similique consectetur enim, atque quasi velit nemo expedita labore. Doloremque, distinctio.
                </Badge>
                <p className='send-date'>
                    12:00 PM | Aug 13
                </p>
            </div>

        </div>
    </>
}

export default Message