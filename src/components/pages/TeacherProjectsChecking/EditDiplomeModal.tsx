import React, {FC, memo} from "react";
import {Modal} from "@mantine/core";
import EditDiplomeTab from "./EditDiplomeTab";
import {IUpdateGraduationProject} from "../../../mobx/services/diplom.service";

export interface IEditDiplomeModal{
    isModalOpened: boolean;
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    id: number | undefined;
    updateGraduationProject: IUpdateGraduationProject
    children?: React.ReactNode
}

export interface IEditDiplomeTab {
    handleCloseModal: () => void;
    id: number | undefined;
    updateGraduationProject: IUpdateGraduationProject
}

export interface IUpdateGraduation {

}

const EditDiplomeModal: FC<IEditDiplomeModal> = ({ isModalOpened, handleCloseModal, updateGraduationProject, id }) => {
    return (
        <Modal
            opened={isModalOpened}
            onClose={handleCloseModal}
            title='Редактировать дипломный проект'
        >
            <EditDiplomeTab
                handleCloseModal={handleCloseModal}
                updateGraduationProject={updateGraduationProject}
                id={id}
            />
        </Modal>
    )
}

export default memo(EditDiplomeModal)