import React, {FC, useEffect, useState} from 'react';
import UserStore from "../../../mobx/stores/user.store";
import DiplomeService from "../../../mobx/services/diplom.service";
import TeacherDiplomeProjectsList from "./TeacherDiplomeProjectsList";



const TeacherProjectsChecking: FC = () => {
    const [diplomes, setDiplomes] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(() => {
        console.log(UserStore.user?.id)
        DiplomeService.getGraduateProjectsByUserTeacherId(Number(UserStore.user?.id)).then(data => setDiplomes(data.data))
    },[])

    useEffect(() => {
        console.log(diplomes)
    },[diplomes])

    return (
        <div>
            <h3>Курсовые проекты</h3>
            <h3>Дипломные проекты</h3>
            <TeacherDiplomeProjectsList projects={diplomes}/>
        </div>
    );
};

export default TeacherProjectsChecking;