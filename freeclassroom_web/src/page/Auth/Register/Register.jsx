import React, { useState } from "react";
import  "./Register.scss";
import { toast } from 'react-toastify';
import { signUp } from "../../../service/auth/AuthenticationService";
import { useDispatch } from "react-redux";
import { doSaveOtp } from "../../../redux/action/verifyOtpAction";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        username:"",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "TEACHER",
        file: null,
    });

    const navigator = useNavigate()

    const [isLoadingVerify,setIsLoadingVerify] = useState(false)

    const [imgUrl,setImgUrl] = useState("https://i.pinimg.com/236x/e6/60/85/e66085932a4b3b411854aff54574ecd6.jpg")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateImage = (e) => {
        setImgUrl(URL.createObjectURL(e.target.files[0]));
        handleFileChange(e);
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword){
            toast.error("Password does not match!");
            return
        }

        setIsLoadingVerify(true)

        const data = await signUp(formData.file, formData.email, formData.name, formData.phone, formData.username, formData.password, formData.role)

        setIsLoadingVerify(false)

        if (data && data.code && data.code == 200) {
            console.log(data?.result?.username)
            dispatch(doSaveOtp(data?.result?.username))
            toast.success(data?.message)
            navigator("/verify-otp")
        }
        else toast.error(data?.message)

    };

    return (
        <section className="register-content">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start">
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                Free <br />
                                <span className="text-primary">classroom</span>
                            </h1>
                            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                Developed by Pham Tien Anh @t9tieanh
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form id="registrationForm" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-8">
                                                <input
                                                    name="fileUpload"
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={handleUpdateImage}
                                                />
                                            </div>
                                            <div className="w-100"></div>
                                            <div className="col-6" style={{ marginTop: "15px", marginBottom: "15px" }}>
                                                <img
                                                    src={imgUrl}
                                                    className="img-responsive product-img"
                                                    alt="Product Preview"
                                                />
                                            </div>
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
                                            <div className="col-md-6 mb-4">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    value={formData.name}
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

                                        <div className="text-center">
                                            <p>or sign up with:</p>
                                            <a href="https://accounts.google.com/o/oauth2/auth?...">
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-google"></i>
                                                </button>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
