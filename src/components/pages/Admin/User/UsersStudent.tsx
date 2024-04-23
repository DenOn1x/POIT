import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import {FC, memo, useEffect, useState} from "react";
import {ActionIcon, Group, Table, Text} from "@mantine/core";
import UserStore, {IGroup} from "../../../../mobx/stores/user.store";
import internal from "stream";
import {IconCheck, IconTrash, IconX} from "@tabler/icons";
import NotificationService from "../../../../mobx/services/notification.service";

interface IUserStudent{
    id: number
    email: string
    name: string
    surname: string
    second_name: string
    is_admin: boolean
    role: string
    start_of_studing: Date
    number_of_ticket: number
    group: IGroup
    subgroup: number
}



const UserStudentListAdmin: FC = () => {
    const [users, setUsers] = useState<Array<IUserStudent>>([])

    useEffect(() => {
        UserStore.getUsersByRole('STUDENT').then(data => setUsers(data))
    },[])

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Email</th>
                    <th>Группа</th>
                    <th>Номер зачетки</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                <>
                    {users.map(user => (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.second_name}</td>
                            <td>{user.email}</td>
                            <td>{user.group.group_name}-{user.group.group_number}</td>
                            <td>{user.number_of_ticket}</td>
                            <td>
                                <Group position="left" spacing="xl">
                                    <ActionIcon>
                                        <IconTrash size={16} stroke={1.5}/>
                                    </ActionIcon>
                                    <ActionIcon color="red">
                                        <IconTrash size={16} stroke={1.5}/>
                                    </ActionIcon>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </>
                </tbody>
            </Table>
    </div>
    )
}

export default memo(UserStudentListAdmin)