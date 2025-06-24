import SectionComponent from '../../../components/ClassDetail/Section/index.jsx'
import { useContext } from 'react'
import { ClassDetailContext } from '../../../context/ClassDetailContext.jsx'
import Card from '~/components/common/Card'
import Breadcrumb from '~/components/common/Breadcrumb/index.jsx'
import { SiGoogleclassroom } from "react-icons/si";

const ClassDetail = () => {

    const { classDetail } = useContext(ClassDetailContext);

    return <>
        <Card 
            name={'Chương trình học'}
            subTitle={'Chi tiết về chương trình học'}
            className={'mt-3 class-detail-section'}
            icon={<SiGoogleclassroom/>}
            children={
                <>
                <div className='card text-center'>
                    <div className='card-header'>
                        <Breadcrumb items={[
                                { name: 'Trang chủ', path: '/' },
                                { name: 'Lớp học của tôi', path: '/class' },
                                { name: 'Chi tiết lớp học', path: null }, // trang hiện tại
                                { name: 'Mọi người', path: '/class-detail/' + classDetail?._id + '/peoples' }
                            ]}/>
                    </div>
                    <div className='card-body'>
                        {
                            classDetail?.sections.map((section, index) => (
                                <div style={{width: '100%'}} key={index}>
                                    <SectionComponent index={index} section = {section} />
                                </div>
                            ))
                        }
                        {classDetail?.sections?.length === 0 && (
                            <h5>Hiện tại lớp học này chưa có nội dung nào !</h5>
                        )}
                    </div>
                </div>
                </>
                }
            />
    </>
}

export default ClassDetail