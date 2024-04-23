import axios from "axios";
import {host} from "../../assets/constants/host.constant";

export interface IUpdateGraduationRequest {
    user_student_id: number;
    user_teacher_id: number;
    theme: string;
    description: string;
    status: string;
}

const getGraduationRequestByStudentId = (user_id: number) => {
    return axios.get(`${host}/graduation-project-request/get-by-user-student-id/${user_id}`)
}

const getGraduationRequestByTeacherId = (user_id: number) => {
    return axios.get(`${host}/graduation-project-request/get-by-user-teacher-id/${user_id}`)
}

const updateGraduationRequest = (id: number, request: IUpdateGraduationRequest) => {
    console.log(request)
    return axios.put(`${host}/graduation-project-request/${id}`, request)
}

const NotificationService = {
    getGraduationRequestByStudentId,
    getGraduationRequestByTeacherId,
    updateGraduationRequest,
}

export default NotificationService;