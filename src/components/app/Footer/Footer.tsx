import {observer} from "mobx-react-lite";
import React, {FC} from "react";
import s from './Footer.module.sass'

const Footer: FC = observer(() => {
    return (
        <div className={s.footer}>
            Footer
        </div>
    )
})

export default Footer