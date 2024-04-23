import React, {FC, memo, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ActionIcon, Anchor, Badge, Group, ScrollArea, Table, Text, useMantineTheme} from "@mantine/core";
import {IconPencil, IconTrash, IconCheck, IconX} from "@tabler/icons";
import NotificationService from "../../../mobx/services/notification.service";
import UserStore from "../../../mobx/stores/user.store";

interface INotification {
    id: number;
    user_student_id: number;
    user_teacher_id: number;
    theme: string;
    description: string;
    status: string;
}

interface NotificationStackProps {
    data: INotification[];
}

const Notification: FC= observer(() => {

    const [notification, setNotification] = useState<Array<INotification>>([])
    useEffect(() => {
        if (UserStore.user?.role == 'TEACHER'){
            NotificationService.getGraduationRequestByTeacherId(Number(UserStore.user.id)).then(data => setNotification(data.data))
        }
        else if (UserStore.user?.role == 'STUDENT'){
            NotificationService.getGraduationRequestByStudentId(Number(UserStore.user.id)).then(data => setNotification(data.data))
        }
    }, [UserStore.user?.id])

    function NotificationTable({ data }: NotificationStackProps) {
        const theme = useMantineTheme();
        return data.map((item) => (
            <tr key={item.id}>
                <td>
                    <Group spacing="sm">
                        <Text size="sm" weight={500}>
                            {item.user_teacher_id}
                        </Text>
                    </Group>
                </td>

                <td>
                    <Text size="sm" weight={500}>
                        Дипломная работа. Тема: {item.theme}
                    </Text>
                </td>
                <td>
                    <Text size="sm" weight={500}>
                        Описание: {item.description}
                    </Text>
                </td>
                {
                    UserStore.user?.role == 'TEACHER'&& (
                        <td>
                            <Group spacing={0} position="right">
                                <ActionIcon>
                                    <IconCheck size={16} stroke={1.5} onClick={() => {
                                        NotificationService.updateGraduationRequest(item.id, {
                                            user_teacher_id: item.user_teacher_id,
                                            user_student_id: item.user_student_id,
                                            theme: item.theme,
                                            description: item.description,
                                            status: "WAITING"
                                        })
                                    }}/>
                                </ActionIcon>
                                <ActionIcon color="red">
                                    <IconX size={16} stroke={1.5} onClick={async () => {
                                        await NotificationService.updateGraduationRequest(item.id, {
                                            user_teacher_id: item.user_teacher_id,
                                            user_student_id: item.user_student_id,
                                            theme: item.theme,
                                            description: item.description,
                                            status: "ACCEPTED"
                                        })
                                    }}/>
                                </ActionIcon>
                            </Group>
                        </td>
                    )
                }
            </tr>
        ))
    }

    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="md">
                <tbody>{NotificationTable({data: notification})}</tbody>
            </Table>
        </ScrollArea>
    );
});

export default memo(Notification);