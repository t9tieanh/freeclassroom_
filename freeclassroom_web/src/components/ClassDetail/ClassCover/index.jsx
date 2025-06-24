import './style.scss'
import { CiTimer } from 'react-icons/ci';
import baseLogo from '~/assets/media/image.png'

const ClassCover = ({name, cover, className, code}) => {

    return (
        <>
            <div class={`card bg-dark text-white cover-class ${className}`}>
                    <img
                        src={cover || baseLogo}
                        alt="Bìa của Lớp học"
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                    <div class='card-img-overlay'>
                        <h5 class='card-title'>
                            <blockquote className='blockquote title-class'>
                                <p className='mb-0'>{name}</p>
                            </blockquote>
                        </h5>
                        {code && <>
                            <h6 class='card-title'>
                                <blockquote className='blockquote title-class'>
                                    <p className='mb-0 fs-6'>Mã tham gia lớp học: {code}</p>
                                </blockquote>
                            </h6>
                        </>}
                        <p class='card-text title-update-date'><CiTimer />&nbsp;Cập nhật 3h trước</p>
                    </div>
            </div>
        </>
    )
}

export default ClassCover