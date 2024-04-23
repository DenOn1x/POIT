import React, {FC, ReactNode, memo, useState} from 'react';
import { observer } from 'mobx-react-lite';
import {Admin, ListGuesser, Resource} from 'react-admin';
import jsonServerProvider from "ra-data-json-server";
import {Button, Menu, Tabs, Text } from '@mantine/core';
import {
    IconArrowsLeftRight,
    IconBook,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings, IconTrash,
    IconUser,
    IconUsers
} from "@tabler/icons";
import UserStudentListAdmin from "./User/UsersStudent";
import UserTeacherListAdmin from "./User/UsersTeacher";
import GroupsListAdmin from "./Groups/GroupAdmin";
import AddStudentModal from "./User/AddStudentModal";
import AddTeacherModal from "./User/AddTeacherModal";
import AddGroupModal from "./Groups/AddGroupModal";

const AdminPage: FC = observer(() => {
    const [isOpenAddStudentModal, setIsOpenAddStudentModal] = useState(false)
    const [isOpenAddTeacherModal, setIsOpenAddTeacherModal] = useState(false)
    const [isOpenAddDisciplineModal, setIsOpenAddDisciplineModal] = useState(false)
    const [isOpenAddGroupModal, setIsOpenAddGroupModal] = useState(false)

    const handleCloseAddStudentModal = () => {
        setIsOpenAddStudentModal(false)
    }

    const handleCloseAddTeacherModal = () => {
        setIsOpenAddTeacherModal(false)
    }

    const handleCloseAddGroupModal = () => {
        setIsOpenAddGroupModal(false)
    }

    const handleCloseAddDisciplineModal = () => {
        setIsOpenAddDisciplineModal(false)
    }

    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button>Инструменты</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Добавить</Menu.Label>
                    <Menu.Item icon={<IconUser size={14} />} onClick={() => {setIsOpenAddStudentModal(true)}}>Студента</Menu.Item>
                    <Menu.Item icon={<IconUser size={14} />} onClick={() => {setIsOpenAddTeacherModal(true)}}>Преподавателя</Menu.Item>
                    <Menu.Item icon={<IconUsers size={14} />} onClick={() => {setIsOpenAddGroupModal(true)}}>Группу</Menu.Item>
                    <Menu.Item icon={<IconBook size={14} />}>Дисциплину</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Tabs defaultValue="gallery">
                <Tabs.List grow>
                    <Tabs.Tab value="students" icon={<IconUser size={14} />}>Студенты</Tabs.Tab>
                    <Tabs.Tab value="teachers" icon={<IconUser size={14} />}>Преподаватели</Tabs.Tab>
                    <Tabs.Tab value="groups" icon={<IconUsers size={14} />}>Группы</Tabs.Tab>
                    <Tabs.Tab value="disciplines" icon={<IconBook size={14} />}>Дисциплина</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="students" pt="xs">
                    <UserStudentListAdmin/>
                </Tabs.Panel>

                <Tabs.Panel value="teachers" pt="xs">
                    <UserTeacherListAdmin/>
                </Tabs.Panel>

                <Tabs.Panel value="groups" pt="xs">
                    <GroupsListAdmin/>
                </Tabs.Panel>

                <Tabs.Panel value="disciplines" pt="xs">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
            <AddStudentModal handleCloseModal={handleCloseAddStudentModal} isModalOpen={isOpenAddStudentModal}/>
            <AddTeacherModal handleCloseModal={handleCloseAddTeacherModal} isModalOpen={isOpenAddTeacherModal}/>
            <AddGroupModal handleCloseModal={handleCloseAddGroupModal} isModalOpen={isOpenAddGroupModal}/>
        </>
    )
})

export default memo(AdminPage)