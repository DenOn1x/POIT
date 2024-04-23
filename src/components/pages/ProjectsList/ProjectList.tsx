import {observer} from "mobx-react-lite";
import {FC, memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ICourseProject} from "../../../interfaces/course/ICourseProject";
import CourseService from "../../../mobx/services/test.service";
import CourseList from "../CourseList/CourseList";
import DiplomeElement, {IGraduationProject} from "../CourseList/DiplomeElement";
import DiplomService from "../../../mobx/services/diplom.service";

const ProjectList: FC = observer(() => {
    const params = useParams();
    const [courseList, setCourseList] = useState<Array<ICourseProject>>([])
    const [diplome, setDiplome] = useState<IGraduationProject>()

    useEffect(() => {
        CourseService.getAllCourseByStudentId(Number(params.id)).then(data => {
            setCourseList(data.data)
        })

        DiplomService.getGraduateProjectByStudentId(Number(params.id)).then(data => {
            setDiplome(data.data)
        })
    },[params.id])


    return (
        <div>
            {(
                <>
                    <h3>Список курсовых проектов:</h3>
                        <CourseList projects={courseList}/>

                    <h3>Дипломный проект</h3>
                        <DiplomeElement id={diplome?.id} user_student_id={diplome?.user_student_id} percent_of_completion={diplome?.percent_of_completion != undefined? (diplome?.percent_of_completion * 100) : (diplome?.percent_of_completion)} theme={diplome?.theme} pattern_of_education={diplome?.pattern_of_education} stages={diplome?.stages}></DiplomeElement>
                </>
            )}
        </div>
    )
})

export default memo(ProjectList)