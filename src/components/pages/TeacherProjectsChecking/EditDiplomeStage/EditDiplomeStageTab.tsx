import React, {ChangeEvent, FC, memo, SetStateAction, useCallback, useState} from "react";
import {IEditDiplomeStageTab} from "./EditDiplomeStageModal";
import {observer} from "mobx-react-lite";
import {Button, Input} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import DiplomeService from "../../../../mobx/services/diplom.service";

const EditDiplomeStageTab: FC<IEditDiplomeStageTab> = observer(({handleCloseModal, id, updateStage}) => {
    const [title, setTitle] = useState(updateStage.title)
    const [description, setDescription] = useState(updateStage.description)
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(updateStage.deadline_date)

    const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }, [title])

    const handleChangeDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }, [title])

    const handleSubmit = useCallback(async () => {
        updateStage.title=title
        updateStage.description=description
        updateStage.deadline_date=deadlineDate != undefined ? deadlineDate : updateStage.deadline_date
        await DiplomeService.updateStage(id, updateStage)
    }, [title])

    return(
        <>
            <Input
                placeholder="Название этапа"
                value={title}
                onChange={handleChangeTitle}
            />
            <br/>
            <Input
                placeholder="Название описание"
                value={description}
                onChange={handleChangeDescription}
            />
            <br/>
            <DatePicker value={deadlineDate} onChange={setDeadlineDate} />;
            <Button onClick={handleSubmit}>Изменить</Button>
        </>
  )
})

export default memo(EditDiplomeStageTab)