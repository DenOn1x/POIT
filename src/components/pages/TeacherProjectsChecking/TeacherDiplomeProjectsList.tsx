import React, {FC, ReactNode} from 'react';
import {ICourseProject} from "../../../interfaces/course/ICourseProject";
import {IGraduationProject} from "../CourseList/DiplomeElement";
import DiplomeProject from "./DiplomeProject";

interface ICourseList {
    projects: IGraduationProject[] | undefined
    children?: ReactNode,
}


const TeacherDiplomeProjectsList:FC<ICourseList>= ({projects}) => {
    return (
        <div>
            {projects?.map(project => (
                <div>
                    <DiplomeProject id={project.id} user_student_id={project.user_student_id} percent_of_completion={project.percent_of_completion} theme={project.theme} pattern_of_education={project.pattern_of_education} stages={project.stages}/>
                </div>
            ))}
        </div>
    );
};

export default TeacherDiplomeProjectsList;