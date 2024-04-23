import axios from "axios";
import {host} from "../../assets/constants/host.constant";



const getGraduateProjectByStudentId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-id/%7Buser-id%7D?user_id=${user_id}`)
}

const getGraduateProjectsByUserTeacherId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-teacher-id/{user_id}`)
}

const CourseService = {
    getGraduateProjectByStudentId,
    getGraduateProjectsByUserTeacherId
}

export default CourseService;