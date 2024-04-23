import CourseService from '../services/test.service'
import {ICourseProject} from "../../interfaces/course/ICourseProject"
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";

class CourseStore {

    courses: Array<ICourseProject> = []

    constructor(user_id: number) {
        makeAutoObservable(this)
        this.loadCourseProjectsByUserId(user_id)
    }

    getAllCoursesByStudentId = () => {
        console.log(this.courses)
        return this.courses
    }

    loadCourseProjectsByUserId = async (user_id: number) => {
        console.log(this.courses)
    }
}

export default CourseStore