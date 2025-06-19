import React, { useState } from 'react';
import './Login.scss';
import LoginForm from '~/components/Login/LoginForm';
import LoginCover from '~/components/Login/Cover'

const Login = () => {

  return (
    <section className='vh-100'>
      <div className='container-fluid h-custom'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <LoginCover />
          <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
