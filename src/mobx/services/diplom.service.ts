import axios from "axios";
import {host} from "../../assets/constants/host.constant";
import {
    IUpdateGraduationStageProject
} from "../../components/pages/TeacherProjectsChecking/EditDiplomeStage/EditDiplomeStageModal";
import {IRequestGraduationProject} from "../../components/pages/TeacherProjects/RequestDiplomeProjectTab";

export interface IUpdateGraduationProject {
    user_student_id: number | undefined;
    percent_of_completion: number | undefined;
    pattern_of_education: string | undefined;
    theme: string | undefined;
}

const getGraduateProjectByStudentId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-id/${user_id}`)
}

const getGraduateProjectsByUserTeacherId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-teacher-id/${user_id}`)
}

const setIsDoneForStage = (stage_id: number) => {
    return axios.post(`${host}/stage-graduation-project/set-is_done/${stage_id}`)
}

const updateStage = (id: number | undefined, stage: IUpdateGraduationStageProject) => {
    return axios.put(`${host}/stage-graduation-project/${id}`, stage)
}

const updateDiplome = (id: number | undefined, diplome: IUpdateGraduationProject) => {
    return axios.put(`${host}/graduation-project/${id}`, diplome)
}

const sendRequset = (obj: IRequestGraduationProject) => {
    return axios.post(`${host}/graduation-project-request/`, obj)
}

const DiplomeService = {
    getGraduateProjectByStudentId,
    getGraduateProjectsByUserTeacherId,
    setIsDoneForStage,
    updateDiplome,
    updateStage,
    sendRequset
}

export default DiplomeService;