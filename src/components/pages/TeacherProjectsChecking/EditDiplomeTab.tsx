import {IEditDiplomeTab} from "./EditDiplomeModal";
import React, {ChangeEvent, FC, memo, useCallback, useState} from "react";
import {observer} from "mobx-react-lite";
import DiplomeService from "../../../mobx/services/diplom.service";
import {Button, Input, PasswordInput} from "@mantine/core";

const EditDiplomeTab: FC<IEditDiplomeTab> = observer(({handleCloseModal, id, updateGraduationProject}) => {
    const [title, setTitle] = useState<string>(updateGraduationProject.theme != undefined ? updateGraduationProject.theme : '')

    const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }, [title])

    const handleSubmit = useCallback(async () => {
        updateGraduationProject.theme = title
        await DiplomeService.updateDiplome(id, updateGraduationProject)
    }, [title])

    return(
        <>
            <Input
                placeholder="Название проекта"
                onChange={handleChangeTitle}
            />
            <br/>
            <Button onClick={handleSubmit}>Изменить</Button>
        </>
    )
})

export default memo(EditDiplomeTab)