import './style.scss'
import { LOCAL_HOST } from '../../../page/ClassList'

const TeacherInfo = ({teacher}) => {

    console.log (teacher)

    return (
        <>
            <div className="card top-card teacherinfo-container">
                <div className="card-body pb-0">
                    <div className="row align-items-center">
                    <div className="col-md-4 teacher-avatar">
                        <div className="text-center border-end">
                        <img
                            src={`${LOCAL_HOST}/files/image/${teacher?.image}`}
                            className="img-fluid avatar-xxl rounded-circle"
                            alt="User Avatar"
                        />
                        <h4 className="text-primary font-size-20 mt-3 mb-2">
                            {teacher?.name}
                        </h4>
                        <h5 className="text-muted font-size-13 mb-0">{teacher?.position}</h5>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="ms-3">
                        <div>
                            <h4 className="card-title mb-2">Teacher</h4>
                            <p className="mb-0 text-muted">
                            {teacher?.description}
                            </p>
                        </div>
                        <div className="row my-4">
                            <div className="col-md-12">
                            <div>
                                <p className="text-muted mb-2 fw-medium">
                                <i className="mdi mdi-email-outline me-2"></i>
                                <a href="mailto:example@example.com">
                                    {teacher?.email}
                                </a>
                                </p>
                                <p className="text-muted fw-medium mb-0">
                                <i className="mdi mdi-phone-in-talk-outline me-2"></i>
                                {teacher?.phone}
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherInfo