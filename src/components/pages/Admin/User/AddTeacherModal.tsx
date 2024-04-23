import React, {ChangeEvent, FC, memo, useCallback, useState} from 'react';
import {Button, Input, Modal,} from "@mantine/core";
import UserStore from "../../../../mobx/stores/user.store";

interface IAddTeacher{
    isModalOpen: boolean,
    handleCloseModal: () => void;
}

export interface IUserTeacherCreate{
    email: string
    name: string
    surname: string
    second_name: string
    password: string
    job_title: string
    rank: string
}

const AddTeacherModal: FC<IAddTeacher> = ({isModalOpen,handleCloseModal }) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [rank, setRank] = useState('')

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

    const handleChangeJobTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setJobTitle(event.target.value)
    }, [jobTitle])

    const handleChangeRank = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRank(event.target.value)
    }, [rank])


    const handleSubmit = async () => {
        const userTeacherCreate: IUserTeacherCreate = {
            email: email,
            name: name,
            surname: surname,
            second_name: secondName,
            password: password,
            rank: rank,
            job_title: jobTitle,
        }
        await UserStore.createUserTeacher(userTeacherCreate)
    }

    return (
        <>
            <Modal
                opened={isModalOpen}
                onClose={handleCloseModal}
                title={"Добавить преподавателя"}
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
                <Input
                    placeholder="Введите должность"
                    value={jobTitle}
                    onChange={handleChangeJobTitle}
                />
                <br/>
                <Input
                    placeholder="Введите звание"
                    value={rank}
                    onChange={handleChangeRank}
                />
                <br/>
                <Button variant="outline" onClick={handleSubmit}>
                    Добавить
                </Button>
            </Modal>
        </>
    );
};

export default memo(AddTeacherModal);