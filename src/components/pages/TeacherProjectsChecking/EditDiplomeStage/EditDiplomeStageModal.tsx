import {Modal} from "@mantine/core";
import React, {FC, memo} from "react";
import EditDiplomeStageTab from "./EditDiplomeStageTab";

export interface IEditDiplomeStageModal{
    isModalOpened: boolean;
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    id: number | undefined;
    updateStage: IUpdateGraduationStageProject
    children?: React.ReactNode
}

export interface IEditDiplomeStageTab {
    handleCloseModal: () => void;
    id: number | undefined;
    updateStage: IUpdateGraduationStageProject
}

export interface IUpdateGraduationStageProject{
    graduation_project_id: number
    title: string
    description: string
    is_done: boolean
    deadline_date: Date
}

const EditDiplomeStageModal: FC<IEditDiplomeStageModal> = ({isModalOpened, handleCloseModal, updateStage, id}) => {
    return (
        <Modal
            opened={isModalOpened}
            onClose={handleCloseModal}
            title="Редактировать этап"
        >
            <EditDiplomeStageTab
                handleCloseModal={handleCloseModal}
                id={id}
                updateStage={updateStage}
            />
        </Modal>
    )
}

export default memo(EditDiplomeStageModal)