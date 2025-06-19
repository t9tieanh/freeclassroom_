import SectionDetail from '../Post/index.jsx'
import './style.scss'
import { MdOutlinePlayLesson } from 'react-icons/md';
import { getPostsBySectionId } from '../../../service/section/SectionService';
import { useEffect, useState } from 'react';
import Tag from '~/components/common/tag'
import Card from '~/components/common/Card'

const SectionComponent = ({index,section}) => {

    const [posts, setPosts] = useState([])

    const [isOpenSection, setIsOpenSection] = useState(false)

    useEffect(() => {
        if (section?.emphasized === true) {
            setIsOpenSection(true);
        }
    }, []);

    useEffect(() => {
        if (isOpenSection)
            fetchPosts(section.id)
    }, [isOpenSection]);


    const fetchPosts = async () => {
        let data = await getPostsBySectionId(section.id)

        if (data && data.code && data.code === 200 && data.result) {
            setPosts(data.result)
        }
    }

    const handleOpenSection = () => {
        setIsOpenSection(!isOpenSection)
    }


    return (
        <>
        <div id={`accordion${index}`}  className={`section-container ${section?.emphasized == true && 'section-emphasize-container'}`}>
        <div className='card'>
            <div className='card-header' id={`headingOne-${index}`}>
                <h5 className='mb-0 row justify-content-between'>
                    <div className='text-start col-4'><MdOutlinePlayLesson />&nbsp;{section?.title} </div>
                    <div className='col-3 chevron-btn-container shadow-5'>
                        <button className={`chevron-btn ${isOpenSection == true && 'show'}`} data-toggle='collapse' onClick={handleOpenSection} data-target={`#collapseOne-${index}`} aria-expanded='true' aria-controls={`collapseOne-${index}`}>
                        </button>
                    </div>
                </h5>
                {section?.emphasized === true && 
                    <div className='emphasized-title'>* Đã được nhấn mạnh</div>
                }
            </div>


            <div id={`collapseOne-${index}`} className={`collapse ${isOpenSection == true && 'show'}`} aria-labelledby={`headingOne-${index}`} data-parent={`#accordion${index}`}>
            <div className='card-body'>
                <div className='content-section'>{section?.content}
                <hr/>
                </div>
                {
                    posts?.map((post, index) => (
                        <div key={index}>
                            <SectionDetail index={index} post = {post} />
                        </div>
                    ))
                }
            </div>
            </div>
        </div>

        </div>
        

        
        </>
    )
}

export default SectionComponent