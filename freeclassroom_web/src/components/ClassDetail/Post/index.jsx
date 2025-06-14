import { CiTimer } from "react-icons/ci";
import { LOCAL_HOST } from "../../../page/ClassList";
import './style.scss'

const SectionDetail = ({post}) => {

    return (
        <div className="card section p-3 section-detail-container">
            <div className="card-body">
                <div className="d-flex align-items-center position-relative">
                    
                    <div className="flex-shrink-0 me-3 start-0">
                        <img 
                            src={`${LOCAL_HOST}/files/image/${post?.postIcon}`}
                            alt="Icon"
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </div>

                    <div className="content-container flex-grow-1 text-start content-text-section exercise-container">
                        <p class="lead fw-normal mb-2 section-detail-title">{post?.title}</p> <hr/>

                        {
                            post.postIcon === "exercise.png" && 
                                <div className="exercise-description">
                                    <p><span class="text-muted">Notice: </span>{post?.content} 
                                    <br/><span class="text-muted"><CiTimer />&nbsp;Create Date: </span>{post?.createDate}</p>
                                </div>
                        }
                        {
                            post.postIcon !== "exercise.png" && 
                            <p>
                                <span class="text-muted">Notice: </span>{post?.content} 
                                <br/><span class="text-muted"><CiTimer />&nbsp;Create Date: </span>{post?.createDate}
                            </p>
                        }
                    </div>

                    <div className="position-absolute bottom-0 end-0">
                        <button className="btn btn-primary">Go into detail</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default SectionDetail;
