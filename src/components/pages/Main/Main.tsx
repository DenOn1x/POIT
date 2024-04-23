import React, { FC, ReactNode, memo } from 'react'
import { observer } from 'mobx-react-lite'
import s from './News.module.sass'
import NewsStore from '../../../mobx/stores/news.store'

interface INews {
    children?: ReactNode,
}

const News: FC<INews> = observer(() => {

    const newsArray = NewsStore.getAllNews()


    const newsLayout = () => newsArray.map(
        news => (
            <div key={news._id} className={s.news__item}>
                <div className={s.news__info}>
                    <div className={s.news__text}>
                        <h2>{news.title}</h2>
                        <p>{news.text}</p>
                    </div>
                    <button>Развернуть</button>
                </div>
            </div>
        )
    )

    return (
        <div className={s.news}>
            {newsLayout()}
        </div>
    )
})

export default memo(News)