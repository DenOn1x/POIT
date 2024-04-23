import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import {FC, memo, useEffect, useState} from "react";
import {ActionIcon, Group, Table} from "@mantine/core";
import UserStore, {IGroup} from "../../../../mobx/stores/user.store";
import internal from "stream";
import {IconTrash} from "@tabler/icons";

interface IUserStudent{
    id: number
    email: string
    name: string
    surname: string
    second_name: string
    is_admin: boolean
    role: string
    job_title: string
    rank: string
}



const UserTeacherListAdmin: FC = () => {
    const [users, setUsers] = useState<Array<IUserStudent>>([])

    useEffect(() => {
        UserStore.getUsersByRole('TEACHER').then(data => setUsers(data))
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
                    <th>Должность</th>
                    <th>Действия</th>
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
                            <td>{user.job_title}</td>
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

export default memo(UserTeacherListAdmin)