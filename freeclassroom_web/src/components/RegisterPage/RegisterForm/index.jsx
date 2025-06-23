import React, { useState } from 'react';
import  './style.scss';
import { toast } from 'react-toastify';
import { signUp } from '~/service/auth/AuthenticationService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextInput from '~/components/common/Input/Input2';
import { Row, Col } from "react-bootstrap";
import PrimaryButton from '~/components/common/button/btn-primary';
import { FaGoogle } from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi2";
import { doSavePendingUserName } from "~/redux/action/verifyOtpAction";


const RegisterForm = () => {
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('TEACHER');
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(
        'https://i.pinimg.com/236x/e6/60/85/e66085932a4b3b411854aff54574ecd6.jpg'
    );
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateImage = (e) => {
        setImgUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (password !== confirmPassword){
            toast.error('Mật khẩu không trùng khớp !');
            return
        }

        setIsLoadingVerify(true)

        const data = await signUp(file, email, name, phone, username, password, role).catch(e => toast.error(e.message))
        console.log(data)

        setIsLoadingVerify(false)

        if (data && data.code && data.code === 201) {
            // console.log(data?.result?.username)
            dispatch(doSavePendingUserName(data?.result))
            toast.success(data?.message)
            navigate('/verify-otp')
        }
        else if (data.response && data.response.data) {
            toast.error(data.response.data.message)
        } else toast.error(data?.message)
    };
    
    
    return <>

    <form id='registrationForm' onSubmit={handleSubmit}>
        <Row>
            <Col xs={8}>
                <input
                    name='fileUpload'
                    type='file'
                    className='form-control'
                    accept='image/*'
                    onChange={handleUpdateImage}
                />
            </Col>
            <Col className='col-6' style={{ marginTop: '15px', marginBottom: '15px' }}>
                <img
                    src={imgUrl}
                    className='img-responsive product-img'
                    alt='Product Preview'
                />
            </Col>
        </Row>

        <Row>
            <Col xs={6}>
                <TextInput value={username} setValue={setUsername}   
                    name={'Username'} placeholder={'Vui lòng nhập username'}
                    type={'text'}
                />
            </Col>
            <Col>
                <TextInput value={email} setValue={setEmail}   
                    name={'Email'} placeholder={'Vui lòng nhập email'}
                    type={'email'}
                />
            </Col>
        </Row>

        <Row>
            <Col xs={6}>
                <TextInput value={name} setValue={setName}   
                    name={'Tên của bạn'} placeholder={'Vui lòng nhập tên của bạn'}
                    type={'text'}
                />
            </Col>
            <Col>
                <TextInput value={phone} setValue={setPhone}   
                    name={'Số điện thoại'} placeholder={'Vui lòng nhập số điện thoại của bạn !'}
                    type={'tel'}
                />
            </Col>
        </Row>

        <TextInput value={password} setValue={setPassword}   
            name={'Mật khẩu'} placeholder={'Nhập mật khẩu'}
            type={'password'}
        />

        <TextInput value={confirmPassword} setValue={setConfirmPassword}   
            name={'Xác nhận mật khẩu'} placeholder={'Xác nhận lại mật khẩu'}
            type={'password'}
        />

        <div className='btn-group mb-4 mt-4'>
            <input
                type='radio'
                className='btn-check'
                name='role'
                id='teacher'
                value='TEACHER'
                checked={role === 'TEACHER'}
                onChange={() => {setRole('TEACHER')}}
            />
            <label className='btn btn-secondary' htmlFor='teacher'>
                Teacher
            </label>

            <input
                type='radio'
                className='btn-check'
                name='role'
                id='student'
                value='STUDENT'
                checked={role === 'STUDENT'}
                onChange={() => {setRole('STUDENT')}}
            />
            <label className='btn btn-secondary' htmlFor='student'>
                Student
            </label>
        </div>

        <PrimaryButton text ={
                <>
                {isLoadingVerify && <i class='fa-solid fa-spinner loaderIcon' style={{marginRight:'10px'}}> </i>} 
                Đăng ký
                </>
            }
            icon={<HiPaperAirplane/>}
            className={'btn btn-primary btn-block mb-4'} 
        />

        <div className='text-center'>
            <p>Hoặc đăng ký bằng: </p>
            <FaGoogle onClick={() => {navigate('/login')}} />
        </div>
    </form>
    
    </>
}

export default RegisterForm