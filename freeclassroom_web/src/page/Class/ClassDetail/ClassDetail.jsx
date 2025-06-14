import SectionComponent from "../../../components/ClassRoom/ClassDetail/Section"
import TeacherInfo from "../../../components/ClassRoom/TeacherInfo"
import ClassInfo from "../../../components/ClassRoom/ClassInfo"
import NavBarComponent from "../../../components/ClassRoom/ClassDetail/NavBar"
import { useEffect, useState } from "react"
import { getClassDetail } from "../../../service/class/ClassRoomService"
import ClassCover from "../../../components/ClassRoom/ClassCover"
import ChevronBtn from "../../../components/common/button/ChevronBtn"
import { useParams } from "react-router-dom"

const ClassDetail = () => {

    const { id } = useParams();
    const [classDetail, setClassDetail] = useState();

    useEffect(() => {
        fetchClassDetail()
    }, []);

    const fetchClassDetail = async () => {
        let data = await getClassDetail(id)
        
        if (data && data.code && data.code === 200 && data.result) {
            setClassDetail(data.result)
        }
    }

    console.log(classDetail?.sections)


    return <>

    <ClassCover name = {classDetail?.name}/>

    <div className="row">

        <div className="col-xl-8">
            <TeacherInfo teacher = {classDetail?.teacher}/>

            <div className="container-main card top-card">


            <div className="card text-center">
                <div className="card-header">
                    <NavBarComponent/>
                </div>
                <div className="card-body">

                    {
                        classDetail?.sections.map((section, index) => (
                            <div style={{width: '100%'}} key={index}>
                                <SectionComponent index={index} section = {section} />
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            </div>
        </div>


        <div className="col-xl-4">
            <ClassInfo detail = {classDetail?.detail} unit = {classDetail?.unit} tags = {classDetail?.tag} />
        </div>
    </div>
    
    
    </>
}

export default ClassDetail