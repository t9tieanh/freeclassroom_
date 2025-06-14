import React, { useState, useEffect } from "react";
import  "./style.scss";
import { toast } from 'react-toastify';
import { activeGGAccount } from "../../../service/ggAuth/GoogleAuthentionService";
import { useDispatch } from "react-redux";
import { doSaveOtp } from "../../../redux/action/verifyOtpAction";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ name, email, imgUrl , setImgUrl }) => {

    const [formData, setFormData] = useState({
        username:"",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "TEACHER",
        file: null,
    });

    const navigator = useNavigate()

    const [isLoadingVerify,setIsLoadingVerify] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm tải ảnh từ imgUrl và chuyển thành File
    const convertImageUrlToFile = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], "profile-image.jpg", { type: blob.type });
            setFormData((prev) => ({ ...prev, file }));
        } catch (error) {
            console.error("Lỗi khi chuyển đổi ảnh:", error);
        }
    };

    useEffect(() => {
        if (imgUrl) {
        convertImageUrlToFile(imgUrl);
        }
    }, [imgUrl]);


    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword){
            toast.error("Password does not match!");
            return
        }

        setIsLoadingVerify(true)

        const data = await activeGGAccount(formData.file, email, name, formData.phone, formData.username, formData.password, formData.role)

        setIsLoadingVerify(false)

        if (data && data.code && data.code == 200) {
            console.log(data?.result?.username)
            dispatch(doSaveOtp(data?.result?.username))
            toast.success(data?.message)
            toast.success("Please log in again !")
            navigator("/login")
        }
        else toast.error(data?.message)

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
                        className="img-responsive product-img" alt="Image" 
                    />
                </div>
                <h3 className="mb-1 text-center ">{name}</h3>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <input
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        name="phone"
                        type="tel"
                        className="form-control mb-4"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>


            <input
                name="password"
                type="password"
                className="form-control mb-4"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <input
                name="confirmPassword"
                type="password"
                className="form-control mb-4"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <div className="btn-group mb-4">
                <input
                    type="radio"
                    className='btn-check'
                    name="role"
                    id="teacher"
                    value="TEACHER"
                    checked={formData.role === "TEACHER"}
                    onChange={handleChange}
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
                    checked={formData.role === "STUDENT"}
                    onChange={handleChange}
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