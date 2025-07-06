import './style.scss'
import TextInput from '~/components/common/Input/Input2'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ChatInput = () => {
    const [message, setMessage] = useState()
    const account = useSelector(state => state.account.account)


    return <>
    <div className='d-flex gap-3 align-items-center'>
        <img src={account?.image}
            alt="avatar 3" width={40} height={40}></img>
        <TextInput className={'flex-grow-1'} placeholder={'Nhập tin nhắn...'} 
            value={message} setValue={setMessage}
        />
        <a class="ms-3" href="#!"><i class="fas fa-paper-plane"></i></a>
    </div>
    </>
}

export default ChatInput