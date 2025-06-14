import { useState } from 'react'
import './ChevronBtn.scss'


const ChevronBtn = () => {

    const [state,setState] = useState(false)

    return (
        <>
            <div className={`chevron-btn ${state && 'open'}`} onClick={() => {setState(!state)}}>
            </div>
        </>
    ) 

}

export default ChevronBtn