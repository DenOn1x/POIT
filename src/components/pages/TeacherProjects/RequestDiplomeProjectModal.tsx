import React, {FC} from 'react';
import {Modal} from "@mantine/core";
import {ICountOfTeacherProjects} from "./TeacherProjectList";
import RequestDiplomeProjectTab from "./RequestDiplomeProjectTab";

export interface IRequestDiplomeProjectModal{
    isModalOpened: boolean;
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    teachers: ICountOfTeacherProjects[]
    children?: React.ReactNode
}

export interface IRequestDiplomeModalTab{
    handleCloseModal: () => void;
    teachers: ICountOfTeacherProjects[]
}

const RequestDiplomeProjectModal: FC<IRequestDiplomeProjectModal> = ( {isModalOpened, handleCloseModal, teachers}) => {
    return (
        <Modal
            opened={isModalOpened}
            onClose={handleCloseModal}
            title='Отправить запрос на проект'>
            <RequestDiplomeProjectTab handleCloseModal={handleCloseModal} teachers={teachers}/>
        </Modal>
    );
};

export default RequestDiplomeProjectModal;