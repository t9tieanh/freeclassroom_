import Header from "../../components/common/Header/Header"
import Footer from "../../components/common/Footer/Footer"
import { Outlet } from "react-router-dom"


const DefaultLayout = () => {
    return (
        <>
            <Header />
                <div className="container-freeclassroom">
                    <Outlet />
                </div>
            <Footer />       
        </>
    )

}

export default DefaultLayout