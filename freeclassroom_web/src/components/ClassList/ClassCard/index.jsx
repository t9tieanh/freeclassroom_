import { LOCAL_HOST } from "../../../page/ClassList";
import { Link } from "react-router-dom";


const ClassCard = ({classroom,index}) => {
    return (
        <div key={index} className="job-box d-md-flex align-items-center justify-content-between mb-30 hover-shadow">
            <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                <img 
                src={`${LOCAL_HOST}/files/image/${classroom.coverImage}`}
                alt="Townhouses and Skyscrapers"
                />
                    {/* {job.initials} */} 
                </div>
                <div className="job-content">
                    <h5 className="text-center text-md-left">{classroom.name}</h5>
                    <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                        <li className="mr-md-4"><i className="zmdi zmdi-pin mr-2"></i> {classroom.unit}</li>
                        <li className="mr-md-4"><i className="zmdi zmdi-money mr-2"></i> {classroom.teacherName}</li>
                        <li className="mr-md-4"><i className="zmdi zmdi-time mr-2"></i> {classroom.code}</li>
                    </ul>
                </div>
            </div>
            <div className="job-right my-4 flex-shrink-0">
                <Link to={`/class-detail/${classroom.id}`}>
                
                <button 
                className="btn d-block w-100 d-sm-inline-block btn-primary"
                >Detail &nbsp;<i class="fa-solid fa-circle-info"></i></button>
                
                </Link>
            </div>
        </div>
    )

}

export default ClassCard;