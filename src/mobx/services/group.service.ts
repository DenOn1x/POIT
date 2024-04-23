import {IRequestGraduationProject} from "../../components/pages/TeacherProjects/RequestDiplomeProjectTab";
import axios from "axios";
import {host} from "../../assets/constants/host.constant";
import {IGroupCreate} from "../../components/pages/Admin/Groups/AddGroupModal";
import {getHeaders} from "./user.service";

const getAllGroups = () => {
    return axios.get(`${host}/group/`).then(data => data.data)
}

const createGroup = (createGroup: IGroupCreate) => {
    const headers = getHeaders()
    return axios.post(`${host}/group/`, createGroup, {headers}).then(data => data.data)
}

const GroupService = {
    getAllGroups,
    createGroup,
}

export default GroupService;