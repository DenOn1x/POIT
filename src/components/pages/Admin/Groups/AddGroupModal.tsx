import React, {ChangeEvent, FC, memo, useCallback, useState} from 'react';
import {Button, Input, Modal,} from "@mantine/core";
import GroupService from '../../../../mobx/services/group.service';

interface IAddGroup{
    isModalOpen: boolean,
    handleCloseModal: () => void;
}

export interface IGroupCreate{
    group_number: number,
    group_name: string,
    count_of_subgroup: number,
    created_at: string
    updated_at: string
}

const AddGroupModal: FC<IAddGroup> = ({isModalOpen,handleCloseModal }) => {
    const [groupNumber, setGroupNumber] = useState(0)
    const [groupName, setGroupName] = useState('')
    const [countOfSubgroup, setCountOfSubgroup] = useState(0)

    const handleChangeGroupNumber = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGroupNumber(Number(event.target.value))
    }, [groupNumber])

    const handleChangeGroupName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value)
    }, [groupName])

    const handleChangeCountOfSubgroup = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCountOfSubgroup(Number(event.target.value))
    }, [countOfSubgroup])


    const handleSubmit = async () => {
        const userTeacherCreate: IGroupCreate = {
            group_number: groupNumber,
            group_name: groupName,
            count_of_subgroup: countOfSubgroup,
            created_at: Date.now().toString(),
            updated_at: Date.now().toString(),
        }
        await GroupService.createGroup(userTeacherCreate)
    }

    return (
        <>
            <Modal
                opened={isModalOpen}
                onClose={handleCloseModal}
                title={"Добавить группу"}
            >
                <Input
                    placeholder="Введите название группы"
                    value={groupName}
                    onChange={handleChangeGroupName}
                />
                <br/>
                <Input
                    placeholder="Введите номер группы"
                    value={groupNumber}
                    onChange={handleChangeGroupNumber}
                />
                <br/>
                <Input
                    placeholder="Введите количество подгрупп"
                    value={countOfSubgroup}
                    onChange={handleChangeCountOfSubgroup}
                />
                <br/>
                <Button variant="outline" onClick={handleSubmit}>
                    Добавить
                </Button>
            </Modal>
        </>
    );
};

export default memo(AddGroupModal);