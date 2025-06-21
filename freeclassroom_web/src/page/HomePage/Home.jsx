import './HomePage.scss';
import freeclassroom from '../../assets/media/others/classroom3.png';
import PrimaryButton from '~/components/common/button/btn-primary'
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {

    const navigator = useNavigate()
    const isAuthentication = useSelector(state => state.account.isAuthentication)

    return ( 
        <div className='homepage-container'>
            <div className="row">
                    <div className="col-6 main_section">
                        <h5>Chào mừng bạn đến với</h5>
                        <h1> Free Classroom</h1>
                        <span>
                            Nơi bạn có thể <strong>Học tập</strong> <br />Và chia sẻ <strong>Kiến thức</strong>
                        </span>
                        <br />
                        <hr />
                        { isAuthentication && 
                            <>
                                <PrimaryButton text={'Lớp học của tôi'} 
                                    icon={<SiGoogleclassroom />}
                                    onClickFunc={() => navigator('/class')} 
                                />
                            </>
                        }
                    </div>
                    <div className="col-6">
                        <img src = {freeclassroom} alt="Classroom" />
                    </div>
                </div>
        </div>
    );
}

export default HomePage;
