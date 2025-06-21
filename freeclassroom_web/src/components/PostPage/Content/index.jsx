import './style.scss'
import Card from '~/components/common/Card'
import { FaUserEdit } from "react-icons/fa";


import React from 'react';

const PostContent = () => {
    return <>
        <Card className={'post-content'} name={<><h3 className='font-weight-bold'>Khám phá những chất liệu sơ mi thoáng mát cho mùa hè</h3></>} 
            subTitle={<>{<FaUserEdit />} Được viết vào 19/04/2004 bởi Phạm Tiến Anh</>}
            children={
                <>
                    <div className='content'>


                    </div>
                </>
            }
        />
    </>
}

export default PostContent