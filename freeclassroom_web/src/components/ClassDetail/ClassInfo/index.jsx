import './style.scss'
import Card from '~/components/common/Card'
import { FaCircleInfo } from 'react-icons/fa6';
import { FaTag } from 'react-icons/fa';
import Tag from '~/components/common/tag'
import { IoInformationCircle } from "react-icons/io5";

const ClassInfo = ({detail, unit, tags}) => {
    return (
        <>
            <Card className={'mt-4 text-muted class-info'} name={'Thông tin lớp học'} icon={<FaCircleInfo />}
                subTitle={'Thông tin về khóa học này'}
                children={
                    <>
                    <div className='pb-2'>
                        <IoInformationCircle />&nbsp;Mô tả
                        <p className='mt-1'>{detail}</p>
                    </div>
                    <div className='pt-2'>
                        <FaTag />&nbsp; Từ khóa liên quan
                        <div className='d-flex gap-2 flex-wrap mt-1'>
                            {
                                tags?.map((tag, index) => (
                                    <>
                                    <Tag className={'light p-1'}
                                        children={<>
                                            <span className='shadow-5 tag'>
                                                <img src={`${tag?.iconUrl}`} width={20}></img>
                                                {tag?.name}
                                            </span></>}
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>

                    </>
                }
            />
        </>
    )
}

export default ClassInfo