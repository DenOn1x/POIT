import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react'

import { IAuthTab } from './RegLogModal'
import { Button, Input, PasswordInput, Text } from '@mantine/core'
import { REG_LOG_TABS_TYPES } from '../../../assets/constants/reglog.constant'
import { observer } from 'mobx-react-lite'
import UserStore from '../../../mobx/stores/user.store'

const SignInTab: FC<IAuthTab> = observer(({handleChangeModalOpenedType, handleCloseModal}) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }, [username])

    const handleChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }, [password])

    const handleSubmit = useCallback(async () => {
        await UserStore.login({
            username,
            password
        })
        if (UserStore.user) {
            handleCloseModal()
            setUsername('')
            setPassword('')
        }
    }, [username, password])

    return (
        <>
            <Input
                placeholder="Your email"
                onChange={handleChangeEmail}
            />
            <PasswordInput
                placeholder="Password"
                description="Password must include at least one letter, number and special character"
                required
                onChange={handleChangePassword}
            />
            <br/>
            <Button onClick={handleSubmit}>Sign In</Button>
        </>
    )
})

export default memo(SignInTab)