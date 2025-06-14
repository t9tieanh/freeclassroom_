import SectionComponent from "../../components/ClassDetail/Section/index.jsx"
// import TeacherInfo from "../../components/ClassRoom/TeacherInfo"
import TeacherInfo from "../../components/ClassDetail/TeacherInfo/index.jsx"
import ClassInfo from "../../components/ClassDetail/ClassInfo/index.jsx"
import NavBarComponent from "../../components/ClassDetail/NavBar/index.jsx"
import { useContext, useEffect, useState } from "react"
import { getClassDetail } from "../../service/class/ClassRoomService"
import { useParams } from "react-router-dom"
import { ClassDetailContext } from "../../context/ClassDetailContext.jsx"

const ClassDetail = () => {

    const { id } = useParams();

    const { classDetail, fetchClassDetail } = useContext(ClassDetailContext);

    useEffect(() => {
        fetchClassDetail(id)
    }, []);


    return <>

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