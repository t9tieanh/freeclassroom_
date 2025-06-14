import './style.scss'
import { CiTimer } from "react-icons/ci";

const ClassCover = ({name}) => {

    return (
        <>
            <div class="card bg-dark text-white cover-class">
                    <img  height={"300px"} src="https://fhqx.hcmute.edu.vn/pluginfile.php/1/theme_maker/defaultcourseimage/1734673769/fhq%20utext%20course%20banner%20%281%29.jpg"  alt="Stony Beach"/>
                    <div class="card-img-overlay">
                        <h5 class="card-title">
                            <blockquote className="blockquote title-class">
                                <p className="mb-0">{name}</p>
                            </blockquote>
                        </h5>
                        <p class="card-text title-updatedate"><CiTimer />&nbsp;Last updated 3 mins ago</p>
                    </div>
            </div>
        </>
    )
}

export default ClassCover