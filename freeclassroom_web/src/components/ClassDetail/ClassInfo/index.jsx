import { FcAbout } from "react-icons/fc";
import './style.scss'
import { LOCAL_HOST } from "../../../page/ClassList";
import { CiShoppingTag } from "react-icons/ci";

const ClassInfo = ({detail,unit,tags}) => {
    return (
        <>
            <div className="card top-card" >
                <div className="card-body-custom">
                    <div className="pb-2">
                        <h4 className="card-title mb-3"><FcAbout />&nbsp;About</h4>
                        <p>{detail}</p>
                    </div>
                    <div className="pt-2">
                        <h4 className="card-title mb-4"><CiShoppingTag />&nbsp; Relate to</h4>
                        <div className="d-flex gap-2 flex-wrap">
                            {
                                tags?.map((tag, index) => (
                                    <span className="shadow-5 tag">
                                        <img src={`${LOCAL_HOST}/files/image/${tag?.iconUrl}`} width={20}></img>
                                        {tag?.name}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassInfo