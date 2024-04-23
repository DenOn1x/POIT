import React, {FC, ReactNode, memo, useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import {IUser} from '../../../mobx/stores/user.store'
import {useParams} from "react-router-dom";
import UserService from "../../../mobx/services/user.service";
import s from './Profile.module.sass'




interface IUserProfile {
    children?: ReactNode,
}

const News: FC<IUserProfile> = observer(() => {
    const params = useParams();
    const prodId = params.id;

    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const userService = new UserService()
        userService.getUserById(prodId).then(data => setUser(data))
    }, [prodId])


    return (
        <div className={s.profile}>
            <div className={s.profile__main_info}>
                <div className={"col-12 pt- pb-3"}>
                    <div className={s.profile__main_info__name}>
                        <h1>{user?.name} [{user?.role === 'TEACHER' ? ("Преподаватель") : ("Студент")}]</h1>
                    </div>
                </div>
            </div>
            <div className={s.profile__full_info}>
                <div className={"display: flex"}>
                    <h2>Основная информация:</h2>
                    <h4>Почта: {user?.email}</h4>
                    {user?.role === 'TEACHER' ? (
                        <>
                            <h4>Должность: {user?.job_title}</h4>
                            <h4>Звание: {user?.job_title}</h4>
                        </>
                    ): (
                        <>
                            <h4>Номер студенческого билета: {user?.number_of_ticket}</h4>
                            <h4>Группа: {user?.group.group_name}</h4>
                            <h4><link rel="alternate" type="application/rss+xml"  title={"Показать успеваемость студента"} href={`http://vuz2.bru.by/rate/${user?.number_of_ticket}/`}/></h4>
                        </>
                    )}
                </div>
            </div>
            { user?.id === prodId ?? (
                <div className={s.profile__full_info}>
                    <div className={"display: flex"}>
                        <h2>Основная информация:</h2>
                        <h4>Почта: {user?.email}</h4>
                        {user?.role === 'TEACHER' ? (
                            <>
                                <h4>Должность: {user?.job_title}</h4>
                                <h4>Звание: {user?.job_title}</h4>
                            </>
                        ): (
                            <>
                                <h4>Номер студенческого билета: {user?.number_of_ticket}</h4>
                                <h4>Группа: {user?.group.group_name}</h4>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
)})

export default memo(News)