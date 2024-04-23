import React, { FC, memo } from 'react'
import { Modal } from '@mantine/core'
import { REG_LOG_TABS_TYPES } from '../../../assets/constants/reglog.constant'
import SignInTab from './SingInTab'

interface IRegLogModal {
    isModalOpened: boolean;
    modalOpenedType: string;
    handleCloseModal: () => void;
    handleOpenModal: () => void;
    handleChangeModalOpenedType: (modalType: string) => void;
    children?: React.ReactNode
}

export interface IAuthTab {
    handleChangeModalOpenedType: (modalType: string) => void;
    handleCloseModal: () => void;
}

const RegLogModal: FC<IRegLogModal> = ({ isModalOpened, modalOpenedType, handleCloseModal, handleChangeModalOpenedType }) => {
    return (
        <Modal
            opened={isModalOpened}
            onClose={handleCloseModal}
            title={modalOpenedType === REG_LOG_TABS_TYPES.SIGN_UP ? 'Sign Up' : 'Sign In'}
        >
            <SignInTab
                    handleChangeModalOpenedType={handleChangeModalOpenedType}
                    handleCloseModal={handleCloseModal}
            />
        </Modal>
    )
}

export default memo(RegLogModal)