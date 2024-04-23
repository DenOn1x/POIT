import {makeAutoObservable} from "mobx";
import UserService, {ILoginUser} from "../services/user.service";
import {IUserStudentCreate} from "../../components/pages/Admin/User/AddStudentModal";
import {IUserTeacherCreate} from "../../components/pages/Admin/User/AddTeacherModal";

export interface IUser {
    id: string
    name: string
    surname: string
    role: string
    is_admin: boolean
    email: string
    password: string
    __v?: any
    job_title: string
    rank: string
    number_of_ticket: string
    group: IGroup
    subgroup: string
}

export interface IGroup {
    group_number: number
    group_name: string
    count_of_subgroup: string
}

class UserStore {
    user: null | IUser = null
    userLoad = false
    userService = new UserService()
    isAdmin = false

    userProfile: IUser | null = null

    constructor () {
        makeAutoObservable(this)
    }

    getAdminValue = () => {
        return this.isAdmin
    }

    getMe = () => {
        return this.userService.getMe()
    }

    setUserMe = async () => {
        const resUser = await this.userService.getMe()
        this.user = resUser.data
        this.setAdminValue()
    }

    setAdminValue = () => {
        this.isAdmin = this.user?.is_admin == true
    }

    login = async (user: ILoginUser) => {
        const res = await this.userService.login(user)
        localStorage.setItem("user", res.data)
        const resUser = await this.userService.getMe()
        this.user = resUser.data
        this.setAdminValue()
    }

    logout = async () => {
        localStorage.removeItem('user')
        // await this.userService.logout()
        this.user = null
        this.isAdmin = false
    }

    refresh = async () => {
        this.userLoad = false
        const res = await this.userService.refresh()
        if (res.data)
            this.user = res.data
        this.setAdminValue()
        this.userLoad = true
    }

    getUserById = async (id: string | undefined) => {
        return this.userService.getUserById(id)
    }

    getAllUsers = async () => {
        return this.userService.getAllUsers()
    }

    getTeachersList = async () => {
        return this.userService.getTeacherList()
    }
    getCountOfTeacherProjects = async () => {
        return this.userService.getCountOfTeacherProjects()
    }
    getUsersByRole = async (role: string) => {
        return this.userService.getUsersByRole(role)
    }
    createUserStudent = async (userStudentCreate: IUserStudentCreate) => {
        return this.userService.createUserStudent(userStudentCreate)
    }
    createUserTeacher = async (userTeacherCreate: IUserTeacherCreate) => {
        return this.userService.createUserTeacher(userTeacherCreate)
    }
}

export default new UserStore()