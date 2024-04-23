import {observer} from "mobx-react-lite";
import {FC, memo, useEffect, useState} from "react";
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import {ActionIcon, Anchor, Badge, Group, ScrollArea, Table, Text, useMantineTheme} from "@mantine/core";
import {IconPencil, IconTrash,} from '@tabler/icons';

const roleColor: Record<string, string> = {
    TEACHER: 'blue',
    STUDENT: 'cyan',
};

interface UsersStackProps {
    data: IUser[];
}

const UserList: FC = observer(() => {
    const [users, setUsers] = useState<Array<IUser>>([])
    useEffect(() => {
        UserStore.getAllUsers().then(usersDB => setUsers(usersDB))
    }, [])

    function UsersTable({ data }: UsersStackProps) {
        const theme = useMantineTheme();
        return data.map((item) => (
            <tr key={item.name}>
                <td>
                    <Group spacing="sm">
                        <Text size="sm" weight={500}>
                            {item.name} {item.surname}
                        </Text>
                    </Group>
                </td>

                <td>
                    <Badge
                        color={roleColor[item.role.toLowerCase()]}
                        variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                    >
                        {item.role}
                    </Badge>
                </td>
                <td>
                    <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
                        {item.email}
                    </Anchor>
                </td>
                <td>
                    <Text size="sm" color="dimmed">
                        {item.email}
                    </Text>
                </td>
                <td>
                    <Group spacing={0} position="right">
                        <ActionIcon>
                            <IconPencil size={16} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon color="red">
                            <IconTrash size={16} stroke={1.5}/>
                        </ActionIcon>
                    </Group>
                </td>
            </tr>
        ))
    }

    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="md">
                <tbody>{UsersTable({data: users})}</tbody>
            </Table>
        </ScrollArea>
    )
})




export default memo(UserList)