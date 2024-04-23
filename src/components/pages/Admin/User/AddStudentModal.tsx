import React, {ChangeEvent, FC, memo, useCallback, useEffect, useState} from 'react';
import {Button, Input, Modal, Select, Text} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {SelectItem} from "../../TeacherProjects/RequestDiplomeProjectTab";
import GroupService from "../../../../mobx/services/group.service";
import {IGroupAdmin} from "../Groups/GroupAdmin";
import UserStore from "../../../../mobx/stores/user.store";

interface IAddStudent{
    isModalOpen: boolean,
    handleCloseModal: () => void;
}

export interface IUserStudentCreate{
    email: string
    name: string
    surname: string
    second_name: string
    password: string
    start_of_studing: Date | null
    number_of_ticket: number
    group_id: number | null
    subgroup: number
}

const AddStudentModal: FC<IAddStudent> = ({isModalOpen,handleCloseModal }) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [startOfStudingDate, setStartOfStudingDate] = useState<Date | null>(null)
    const [numberOfTicket, setNumberOfTicket] = useState(0)
    const [subgroup, setSubgroup] = useState(0)
    const [groupId, setGroupId] = useState<string | null>(null)
    const [groupsData, setGroupsData] = useState<Array<SelectItem>>([])
    const [groups, setGroup] = useState<Array<IGroupAdmin>>([])


    const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }, [name])

    const handleChangeSurname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value)
    }, [surname])

    const handleChangeSecondName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSecondName(event.target.value)
    }, [secondName])

    const handleChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }, [email])

    const handleChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }, [password])

    const handleChangeNumberOfTicket = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNumberOfTicket(Number(event.target.value))
    }, [numberOfTicket])

    const handleChangeSubgroup = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSubgroup(Number(event.target.value))
    }, [subgroup])

    useEffect(() => {
        GroupService.getAllGroups().then(data => setGroup(data));
        handleTakeGroups()
    },[])

    useEffect(() => {
        handleTakeGroups()
    },[groups])

    const handleTakeGroups = () => {
        let array: SelectItem[] = []
        groups.map(group => {
            let arrayElement = {
                value: group.id,
                label: group.group_name + "-" + group.group_number
            }
            array.push(arrayElement)
        })
        setGroupsData(array)
    }

    const handleSubmit = async () => {
        const userStudentCreate: IUserStudentCreate = {
            email: email,
            name: name,
            surname: surname,
            second_name: secondName,
            password: password,
            start_of_studing: startOfStudingDate,
            number_of_ticket: numberOfTicket,
            group_id: Number(groupId),
            subgroup: subgroup,
        }
        await UserStore.createUserStudent(userStudentCreate)
    }

    return (
        <>
            <Modal
                opened={isModalOpen}
                onClose={handleCloseModal}
                title={"Добавить студента"}
            >
                <Input
                    placeholder="Введите имя"
                    value={name}
                    onChange={handleChangeName}
                />
                <br/>
                <Input
                    placeholder="Введите фамилию"
                    value={surname}
                    onChange={handleChangeSurname}
                />
                <br/>
                <Input
                    placeholder="Введите отчество"
                    value={secondName}
                    onChange={handleChangeSecondName}
                />
                <br/>
                <Input
                    placeholder="Введите почту студента"
                    value={email}
                    onChange={handleChangeEmail}
                />
                <br/>
                <Input
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handleChangePassword}
                />
                <br/>
                <DatePicker
                    placeholder="Выберите дату начала обучения"
                    value={startOfStudingDate}
                    onChange={setStartOfStudingDate} />
                <br/>
                <Input
                    placeholder="Введите номер зачетки"
                    value={numberOfTicket}
                    onChange={handleChangeNumberOfTicket}
                />
                <Select
                    label="Выберите группу"
                    placeholder="Empty"
                    searchable
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    value={groupId}
                    data={groupsData}
                    onChange={setGroupId}
                />
                <br/>
                <Input
                    placeholder="Введите номер подгруппы"
                    value={subgroup}
                    onChange={handleChangeSubgroup}
                />
                <Button variant="outline" onClick={handleSubmit}>
                    Добавить
                </Button>
            </Modal>
        </>
    );
};

export default memo(AddStudentModal);