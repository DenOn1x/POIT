import React, {FC, useEffect, useRef, useState} from 'react';
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import {IGraduationProjectForList} from "../CourseList/DiplomeElement";
import {Button, Table} from "@mantine/core";
import RequestDiplomeProjectModal from "./RequestDiplomeProjectModal";

interface ITeacherWithProject{
    projects: IGraduationProjectForList[]
    user_teacher: IUser
}
export interface ICountOfTeacherProjects{
    id: number
    user_teacher_id: number
    max_count: number
    user: IUser
}

interface Test{
    children?: JSX.Element|JSX.Element[];
}

const TeacherProjectList: FC<Test> = () => {
    const [teachersWithProject, setTeachersWithProject] = useState<Array<ITeacherWithProject>>([])
    const [countOfTeacherProjects, setCountOfTeacherProjects] = useState<Array<ICountOfTeacherProjects>>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {current: handleOpenModal} = useRef(() => {
        setIsModalOpen(true)
    })

    const {current: handleCloseModal} = useRef(() => {
        setIsModalOpen(false)
    })

    useEffect(() => {
       UserStore.getTeachersList().then(date => setTeachersWithProject(date))
        UserStore.getCountOfTeacherProjects().then(date => setCountOfTeacherProjects(date))
    },[])
    
    useEffect(() => {
        console.log(countOfTeacherProjects)
    },[countOfTeacherProjects])


    return (
        <>
            {UserStore.user != null && UserStore.user?.role == 'STUDENT' && (
                <Button radius="xl" onClick={() => setIsModalOpen(true)}>
                    Отправить запрос дипломной работы
                </Button>
            )}
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Количество дипломных работ</th>
                </tr>
                </thead>
                <tbody>
                {countOfTeacherProjects.map(teacher => (
                    <>
                        <tr>
                            <td>{teacher.user.surname} {teacher.user.name}</td>
                            <td>{teacher.user.rank} кафедры ПОИТ</td>
                            <td>{teacher.max_count}</td>
                        </tr>
                    </>
                ))}
                </tbody>
            </Table>
            <br/><br/><br/>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                <tr>
                    <th>Студент</th>
                    <th>Группа</th>
                    <th>Тема</th>
                </tr>
                </thead>
                <tbody>
                {teachersWithProject.map(data => {
                    return (
                        <>
                            <tr>
                                <td colSpan={2}>{data.user_teacher.name} {data.user_teacher.subgroup} {data.user_teacher.rank}</td>
                                <td>{data.user_teacher.rank}</td>
                            </tr>
                            {data.projects.map(project => {
                                console.log(project)
                                return(
                                <>
                                <tr>
                                    <td>{project.user.name} {project.user.surname}</td>
                                    <td>{project.user.group.group_name}-{project.user.group.group_number}</td>
                                    <td>{project.theme}</td>
                                </tr>
                                </>
                            )})}
                        </>
                    )
                })}
                </tbody>
            </Table>
            <RequestDiplomeProjectModal handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} isModalOpened={isModalOpen} teachers={countOfTeacherProjects}/>
        </>
    );
};

export default TeacherProjectList;