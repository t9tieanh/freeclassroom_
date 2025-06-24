import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import App from './App';
import HomePage from './page/HomePage/Home';
import Login from './page/Auth/Login/Login';
import Register from './page/Register/Register';
import VerifyOTP from './page/Auth/VerifyOtp/VerifyOtp';
import ClassList from './page/ClassList/index.jsx';
import ClassLayout from './layout/classdetail/index.jsx';
import ClassDetail from './page/ClassDetailPage/ClassDetail/index.jsx';
import PeopleClassDetail from './page/ClassDetailPage/Peoples';
import Post from './page/Post'

import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import DefaultLayout from './layout/default/index.jsx';
import Authentication from './page/Auth/GgAuthenticate/index.jsx';
import PostLayout from './layout/post';
import PrivateVerifyOtpRoute from './routes/PrivateVerifyOtpRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <DefaultLayout /> , children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <Login /> },
        { path: 'authentication', element: <Authentication /> },
        { path: 'register', element: <Register /> },
        { path: 'class', element: <ClassList /> },
        {
          path: 'class-detail/:classId',
          element: <ClassLayout />,
          children: [
            { index: true, element: <ClassDetail /> },
            { path: 'peoples', element: <PeopleClassDetail /> }
          ],
        }, 
        {
          path: 'post',
          element: <PostLayout />,
          children: [
            { path: ':postId', element: <Post /> }
          ],
        }, 
        { path: 'verify-otp', element: <PrivateVerifyOtpRoute children={<VerifyOTP />} /> }, 
      ]},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer />
    </PersistGate>
  </Provider>
);

reportWebVitals();
