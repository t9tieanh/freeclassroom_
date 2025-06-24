
import React, { useState } from 'react';
import './style.scss';
import { login } from '~/service/auth/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doUpdateUser } from '~/redux/action/updateUserAction';
import { OAuthConfig } from '~/conf/conf';
import TextInput from '~/components/common/Input/Input2'
import CheckBox from '~/components/common/Checkbox';
import PrimaryButton from '~/components/common/button/btn-primary';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import LoaderIcon from '~/components/common/Icon/LoaderIcon';


const LoginForm = () => {

  // login 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // success, danger, etc.
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)


  // gg authentication 
  const handleContinueWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const callbackUrl = OAuthConfig.redirectUri;
      const authUrl = OAuthConfig.authUri;
      const googleClientId = OAuthConfig.clientId;
  
      const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
      )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

      window.location.href = targetUrl;
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login(username, password).catch(e => toast.error(e.message))
    
    if (data && data.code && data.code === 200 && data?.result?.valid) {
      dispatch(doUpdateUser(data.result))

      setIsLoading(true);
      toast.success(data.message)
      setTimeout(() => {
          setAlertType('success');
          setAlertMessage(data.message);
          setIsLoading(false); 
          navigate('/');
      }, 2000);

    } else if (data.response && data.response.data) {
      toast.error(data.response.data.message)
    } else toast.error(data?.message)
  }


    return (<>
    
    <form className='login-form' onSubmit={(e) => {handleLogin(e)}}>
              {/* Social Login */}
              <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                <p className='lead fw-normal mb-0 me-3'>Sign in with</p>
                <a
                  href='#'
                  onClick={(e) => {handleContinueWithGoogle(e)}}
                  className='btn btn-primary btn-floating mx-1 d-flex align-items-center justify-content-center'
                >
                  <FaGoogle size={20} />
                </a>
              </div>

              <div className='divider d-flex align-items-center my-4'>
                <p className='text-center fw-bold mx-3 mb-0'>Or</p>
              </div>

              {/* Email Input */}
              <TextInput 
                name={'Email'} 
                setValue={setUsername} 
                value={username} 
                placeholder={'Nhập username của bạn =))'}
                type={'email'}
              />

              {/* Password Input */}
              <TextInput name={'Mật khẩu'} 
                setValue={setPassword} 
                value={password} 
                placeholder={'Nhập password của bạn =))'} 
                type={'password'}
              />

              {/* Remember Me & Forgot Password */}
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <CheckBox name={'Lưu mật khẩu'} value={true} />
              </div>

              {/* Error Message */}
              {alertMessage && (
                <div className='form-outline mb-4' style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <div className={`alert alert-${alertType}`} role='alert'>
                    {alertMessage}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className='text-center text-lg-start mt-4 pt-2'>
                  <PrimaryButton className={'btn btn-primary btn-lg'} text={'Đăng nhập'} 
                    onClickFunc={handleLogin}
                    children={<>{isLoading && <LoaderIcon />} </>}
                  />
                <p className='small fw-bold mt-2 pt-1 mb-0'>
                  Don't have an account?{' '}
                  <a onClick={() => {navigate('/register')}}  className='text-danger'>
                    Register
                  </a>
                </p>
              </div>
            </form>
    </>)
}

export default LoginForm