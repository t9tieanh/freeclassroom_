import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import App from './App';
import HomePage from './page/HomePage/Home';
import Login from './page/Auth/Login/Login';
import Register from './page/Auth/Register/Register';
import VerifyOTP from './page/Auth/VerifyOtp/VerifyOtp';
import ClassList from './page/ClassList/index.jsx';
import ClassLayout from './layout/teacher/classDetail/index.jsx';
import ClassDetail from './page/ClassDetail/index.jsx';
import PeopleComponent from './page/People/index.jsx';

import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import DefaultLayout from './layout/default/index.jsx';
import Authentication from './page/Auth/GgAuthenticate/index.jsx';
import PostPage from './page/PostPage/index.jsx';


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
        { path: 'verify-otp', element: <VerifyOTP /> },
        { path: 'class', element: <ClassList /> },
        {
          path: 'class-detail',
          element: <ClassLayout />,
          children: [
            { path: ':id', element: <ClassDetail /> },
            { path: 'post', element: <PostPage /> },
            { path: 'main/:id', element: <ClassDetail /> },
            { path: 'people', element: <PeopleComponent /> },
          ],
        },  
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
