import React, {ChangeEvent, FC, memo, useCallback, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import DiplomeService from "../../../mobx/services/diplom.service";
import {Button, Input, PasswordInput, Select, Textarea} from "@mantine/core";
import {IRequestDiplomeModalTab} from "./RequestDiplomeProjectModal";
import UserStore from "../../../mobx/stores/user.store";

export interface IRequestGraduationProject{
    user_student_id: number
    user_teacher_id: number
    theme: string
    description: string
    status: string
}

export interface SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}

const RequestDiplomeProjectTab: FC<IRequestDiplomeModalTab> = observer(({handleCloseModal, teachers}) => {
    const [data, setData] = useState<Array<SelectItem>>([])
    const [title, setTitle] = useState<string>('')
    const [userTeacherId, setUserTeacherId] = useState<string | null>(null)
    const [description, setDescription] = useState<string>('')
    const handleChangeTheme = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }, [title])

    useEffect(() => {
        handleCreateData()
    },[])
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const teacherRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
        console.log(teacherRef)
    },[teacherRef])



    const handleChangeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }, [description])

    const handleCreateData = () => {
        let array: SelectItem[] = []
        teachers.map(teacher => {
            let arrayElement = {
                value: teacher.user_teacher_id,
                label: teacher.user.surname + " " + teacher.user.name
            }
            array.push(arrayElement)
        })
        setData(array)
    }

    const handleSubmit = useCallback(async () => {

        await DiplomeService.sendRequset({
            user_student_id: Number(UserStore.user?.id),
            user_teacher_id: Number(userTeacherId),
            theme: title,
            description: description,
            status: 'WAITING'

        })
    }, [title])

    return(
        <>
            <Select
                label="Выберите преподавателя"
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                maxDropdownHeight={280}
                value={userTeacherId}
                data={data}
                onChange={setUserTeacherId}
            />
            <Input
                placeholder="Тема проекта"
                onChange={handleChangeTheme}
            />
            <Textarea
                placeholder="Опишите свою дипломную работу"
                label="Описание"
                ref={descriptionRef}
                withAsterisk
            />
            <br/>
            <Button onClick={handleSubmit}>Изменить</Button>
        </>
    )
})

export default memo(RequestDiplomeProjectTab)