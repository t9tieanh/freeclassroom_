import { useState, useRef } from 'react';
import './style.scss';
import OtpInput from 'react-verify-otp';
import '../../../../node_modules/react-verify-otp/dist/style.css'
import { verifyOTPfunc } from '../../../service/auth/AuthenticationService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Card from '~/components/common/Card';
import { MdClass } from "react-icons/md";
import PrimaryButton from '~/components/common/button/btn-primary';
import { HiPaperAirplane } from "react-icons/hi2";
import { doSavePendingUserName } from '~/redux/action/verifyOtpAction';
import Alert from 'react-bootstrap/Alert';
import { IoIosTime } from "react-icons/io";
import Countdown from "react-countdown";

const VerifyOTP = () => {

    const username = useSelector(state => state.userVerifyOtp.username);
    const expireDateTime = useSelector(state => state.userVerifyOtp.expireDateTime)

    const otpRef = useRef(null);
    const [otp, setOtp] = useState('');
    const [isLoadingVerify, setIsLoadingVerify] = useState(false)
    const navigator = useNavigate()
    const dispatch = useDispatch ()

    const handleCompletedVerifyOtp = () => {
        dispatch(doSavePendingUserName({user: null}))
    }

    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };

    const isValidOTP = (otp) => /^\d{4}$/.test(otp);

    const handleSubmitVerifyOtp = async() => {

        if (!isValidOTP(otp)) {
            toast.error('Vui lòng điền OTP hợp lê ! (4 ký tự)');
            return 
        }

        setIsLoadingVerify(true) // setloading

        const data = await verifyOTPfunc(username, otp).catch(e => toast.error(e.message))

        setIsLoadingVerify(false)

        if (data && data.code && data.code === 200){
            // xóa verify otp nếu thành công !
            handleCompletedVerifyOtp()
            toast.success(data.message)
            navigator('/')
        }else if (data.response && data.response.data) {
            toast.error(data.response.data.message)
            setOtp('')
        } else 
            toast.error(data?.message)
    }
    

    return <>
            <Alert variant="danger" className="text-center">
                Mã code OTP sẽ hết hạn trong <IoIosTime /> 
                <Countdown 
                    // onComplete={handleCancelReservation} 
                    date={expireDateTime} 
                    onComplete={handleCompletedVerifyOtp}
                />
            </Alert>
            <Container className='align-self-center mt-4'>
                <Card 
                    icon={<MdClass />}
                    name={'Xác thực tài khoản'}
                    subTitle={'Vui lòng nhập mã code OTP gồm 4 chữ số để kích hoạt tài khoản !'}
                    children={
                        <>
                            <div className='verify-otp-input mt-5'>
                                <OtpInput
                                    ref={otpRef}
                                    otpValue={otp}
                                    onChange={handleChangeOtp}
                                    separator={'♦'}
                                    shouldAutoFocus={true}
                                    inputType='number'
                                />
                                <Container className='d-flex flex-column align-items-center justify-content-center mt-4'>
                                    <PrimaryButton 
                                        className={'align-self-center'}
                                        onClickFunc={handleSubmitVerifyOtp}
                                        text={
                                            <>
                                            {isLoadingVerify && <i class='fa-solid fa-spinner loaderIcon' style={{marginRight:'10px'}}> </i>} 
                                            Verify OTP
                                            <HiPaperAirplane className='ml-1' size={20}/>
                                            </>
                                        }
                                    />
                                    <hr/>
                                    <p className='card-text fs-6'>Bạn chưa nhận được mã code ? <span className='high-ligt-text'> Gửi lại ở đây</span></p>
                               </Container>
                            </div>
                        </>
                    }
                />
            </Container>
        </>
    }

export default VerifyOTP