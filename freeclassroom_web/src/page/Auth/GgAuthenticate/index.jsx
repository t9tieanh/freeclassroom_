import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingOverLay from "../../../components/common/LoadingOverLay";
import { useEffect, useState } from "react";
import { exchangeToken } from "../../../service/ggAuth/GoogleAuthentionService";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../../redux/action/updateUserAction";
import './style.scss';
import RegisterForm from "../../../components/RegisterPage/OAuth2RegisterForm";
import { data } from "jquery";
import { set } from "nprogress";
import { toast } from "react-toastify";

export const GGIcon = () => {
    return <>
    <a
        href="#"
        className="btn-floating mx-1"
    > <i className="fab fa-google"></i></a>
    </>
}

const AuthenticationPage = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code"); 
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigator = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (code) {
                let data = await exchangeToken(code);
    
                console.log("data", data);
    
                if (data && data.code && data.code === 200 && data?.result) {
                    setIsLoading(false);
                    if (data.result.valid) {
                        // Xử lý cho người dùng cũ (đã có tài khoản)
                        toast.success(data.message)
                        dispatch(doUpdateUser(data.result))
                        navigator('/')
                    }
                    setName(data.result.name);
                    setEmail(data.result.email);
                    setImageUrl(data.result.imageUrl);
                }
            }
        };
    
        fetchData();
    }, [code]); // Dependency đảm bảo chạy lại khi `code` thay đổi

    

    return (
        <>
            <LoadingOverLay isLoading={isLoading} text={`Đang xác thực với Google, xin vui lòng chờ !`} icon = {<GGIcon/>} />
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
                                    { !isLoading && <RegisterForm name = {name} email = {email} imgUrl = {imageUrl} setImgUrl={setImageUrl} /> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default AuthenticationPage;