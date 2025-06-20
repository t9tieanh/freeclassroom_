import React, { useState, useEffect } from "react";
import  "./style.scss";
import { toast } from 'react-toastify';
import { activeGGAccount } from "../../../service/ggAuth/GoogleAuthentionService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from '~/components/common/Input/Input2'

const RegisterForm = ({ name, email, imgUrl , setImgUrl }) => {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("TEACHER");
    const [file, setFile] = useState(null);

    const navigator = useNavigate()

    const [isLoadingVerify,setIsLoadingVerify] = useState(false)

    // Hàm tải ảnh từ imgUrl và chuyển thành File
    const convertImageUrlToFile = async (url) => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            const file = new File([blob], `profile-image${new Date().getTime}.jpg`, { type: 'image/jpeg' });
            setFile(file)
        } catch (error) {
            console.error("Lỗi khi chuyển đổi ảnh:", error);
        }
    };

    useEffect(() => {
        if (imgUrl) {
        convertImageUrlToFile(imgUrl);
        }
    }, [imgUrl]);


    // tiến hành active account
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (password !== confirmPassword){
            toast.error("Mật khẩu không trùng khớp !");
            return
        }

        setIsLoadingVerify(true)

        const data = await activeGGAccount(file, email, name, phone, username, password, role)

        setIsLoadingVerify(false)

        if (data && data.code && data.code === 200) {
            toast.success(data?.message)
            navigator("/login")
        } else if (data.response && data.response.data) {
            console.log(data)
            toast.error(data.response.data.message)
        } else toast.error(data?.message)

    };



    return (
        <>
        <form id="registrationForm shadow-3" className="register-form" onSubmit={handleSubmit}>
            <div className="row m-4 text-center">
                <div className="text-welcome">
                    <h2 class="mb-4">Continue registration</h2>
                    <p class="mb-0" >Hello @{name} welcome to freeClasroom.</p>
                </div>

                <div className="w-100"></div>
                <div className="col-4 mx-auto " style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <img
                        src={imgUrl}
                        referrerpolicy="no-referrer"
                        className="img-responsive product-img" alt="Image" 
                    />
                </div>
                <h3 className="mb-1 text-center ">{name}</h3>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <TextInput name={'Username'} 
                        placeholder={'Nhập username'} value={username}
                        setValue={setUsername} 
                    />
                </div>
                <div className="col-md-6">
                    <TextInput name={'Số điện thoại'} 
                        placeholder={'Nhập số điện thoại'} value={phone}
                        setValue={setPhone} 
                    />
                </div>
            </div>


            <TextInput name={'Mật khẩu'} 
                placeholder={'Nhập mật khẩu'} value={password}
                inputType={'password'}
                setValue={setPassword} 
            />

            <TextInput name={'Xác nhận mật khẩu'} 
                inputType={'password'}
                placeholder={'Nhập lại mật khẩu'} value={confirmPassword}
                setValue={setConfirmPassword} 
            />

            <div className="btn-group mb-4 mt-4">
                <input
                    type="radio"
                    className='btn-check'
                    name="role"
                    id="teacher"
                    value="TEACHER"
                    checked={role === "TEACHER"}
                    onChange={() => {setRole('TEACHER')}}
                />
                <label className="btn btn-secondary" htmlFor="teacher">
                    Teacher
                </label>

                <input
                    type="radio"
                    className='btn-check'
                    name="role"
                    id="student"
                    value="STUDENT"
                    checked={role === "STUDENT"}
                    onChange={() => {setRole('STUDENT')}}
                />
                <label className="btn btn-secondary" htmlFor="student">
                    Student
                </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
                {isLoadingVerify && <i class="fa-solid fa-spinner loaderIcon" style={{marginRight:"10px"}}> </i>} 
                Sign up
            </button>
        </form>
        
        
        </>
    )
}

export default RegisterForm;