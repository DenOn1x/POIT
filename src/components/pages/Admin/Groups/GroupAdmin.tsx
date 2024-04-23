import {FC, memo, useEffect, useState} from "react";
import UserStore from "../../../../mobx/stores/user.store";
import {ActionIcon, Group, Table} from "@mantine/core";
import {IconSettings, IconTrash} from "@tabler/icons";
import * as React from "react";
import GroupService from "../../../../mobx/services/group.service";

export interface IGroupAdmin{
    group_number: number,
    group_name: string,
    count_of_subgroup: number,
    id: number,
}

const GroupsListAdmin: FC = () => {
    const [groups, setGroups] = useState<Array<IGroupAdmin>>([])

    useEffect(() => {
        GroupService.getAllGroups().then(data => setGroups(data))
    },[])

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Группа</th>
                    <th>Количество подгрупп</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                <>
                    {groups.map(group => (
                        <tr>
                            <td>{group.group_name}-{group.group_number}</td>
                            <td>{group.count_of_subgroup}</td>
                            <td>
                                <Group position="left" spacing="xl">
                                    <ActionIcon>
                                        <IconSettings size={16} stroke={1.5}/>
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

export default memo(GroupsListAdmin)