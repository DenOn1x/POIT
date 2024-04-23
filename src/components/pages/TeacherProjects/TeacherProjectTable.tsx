import React, {useEffect, useState} from 'react';
import UserStore from "../../../mobx/stores/user.store";

const TeacherProjectTable = () => {
    const [teachers, setTeachers] = useState()

    useEffect(() => {
        UserStore.getTeachersList().then(data => setTeachers(data))
        console.log(teachers)
    },[])

    return (
        <div>

        </div>
    );
};

export default TeacherProjectTable;