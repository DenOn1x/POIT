import axios from "axios";
import {host} from "../../assets/constants/host.constant";



const getAllCourseByStudentId = (user_id: number) => {
    return axios.get(`${host}/course-project/get-projects-by-student/${user_id}`)
}


const CourseService = {
    getAllCourseByStudentId,
}

export default CourseService;