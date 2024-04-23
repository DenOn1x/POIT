import { host } from "../../assets/constants/host.constant";
import axios from 'axios'
import {IUserStudentCreate} from "../../components/pages/Admin/User/AddStudentModal";
import {IUserTeacherCreate} from "../../components/pages/Admin/User/AddTeacherModal";

export interface ILoginUser {
    username : string;
    password: string;
}

export const getHeaders = (): object => {
    const headers: any = {
        'Content-Type': 'application/json',
    };
    const authToken = localStorage.getItem("user")
    if (authToken) headers['x-auth-token'] = authToken;
    console.log(headers['x-auth-token'])
    return headers;
};

class UserService {
    login = async  (user: ILoginUser) => {
        return axios.post(`${host}/auth/login`, JSON.stringify(`grant_type&username=${user.username}&password=${user.password}&scope=&client_id=&client_secret=`))
    }
    logout = async () => {
        return axios.post(`${host}/auth/logout`, {}, {withCredentials: true})
    }
    refresh = async () => {
        return axios.get(`${host}/user/me`, {withCredentials: true})
    }
    getUserById = async (id: string | undefined) => {
        return fetch(`${host}/user/${id}`).then(data => data.json())
    }

    getAllUsers = async () => {
        return fetch(`${host}/user/`).then(data => data.json())
    }

    getTeacherList = async () => {
        return axios.get(`${host}/graduation-project/get-all-teachers-projects`).then(data => data.data)
    }
    getCountOfTeacherProjects = async () => {
        return axios.get(`${host}/graduation-project/get-count-of-teachers-projects`).then(data => data.data)
    }
    getMe = async () => {
        const headers = getHeaders();
        console.log({headers})
        return axios.get(`${host}/user/me`,{headers} )
    }
    getUsersByRole = async (role: string) => {
        return axios.get(`${host}/user/get-by-role/${role}`).then(data => data.data)
    }
    createUserStudent = async (createUserStudent: IUserStudentCreate) => {
        return axios.post(`${host}/auth/sing-up-student/`, createUserStudent)
    }
    createUserTeacher = async (createUserTeacher: IUserTeacherCreate) => {
        return axios.post(`${host}/auth/sing-up-teacher/`, createUserTeacher)
    }
}

export default UserService