import React, {FC, useEffect, useRef, useState} from 'react';
import {IGraduationProject} from "../CourseList/DiplomeElement";
import {Accordion, Button, Dropdown} from "react-bootstrap";
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import s from './TeacherProjectsCheckking.module.sass'
import DiplomeService from "../../../mobx/services/diplom.service";
import EditDiplomeModal from "./EditDiplomeModal";
import DiplomeStage from "./DiplomeStage";
import { RingProgress, Text, ThemeIcon, Center, Timeline } from '@mantine/core';
// import { IconCheck } from '@tabler/icons';

const DiplomeProject: FC<IGraduationProject> = ({id, user_student_id, percent_of_completion, theme, pattern_of_education, stages}) => {
    const [user_student, setUserStudent] = useState<IUser>()
    const [isModalDiplomeEditShow, setIsModalDiplomeEditShow] = useState(false);

    const [active, setActive] = useState<number>(0)


    useEffect(() => {
        UserStore.getUserById(String(user_student_id)).then(data => setUserStudent(data));
        let activeTemp = 0;
        if (stages?.length != undefined){
            for (let i = 0; i < stages.length; i++){
                if (stages[i].is_done){
                    activeTemp++;
                }
                else {
                    break;
                }
            }
            setActive(activeTemp)
        }

    },[])

    const handleSetIsDone = (stage_id: number) => {
        if (stage_id != undefined){
            DiplomeService.setIsDoneForStage(stage_id).then(data => console.log(data.data))
        }
    }

    const {current: handleOpenModal} = useRef(() => {
        setIsModalDiplomeEditShow(true)
    })

    const {current: handleCloseModal} = useRef(() => {
        setIsModalDiplomeEditShow(false)
    })

    return (
        <div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <RingProgress
                                size={40}
                                thickness={2}
                                roundCaps
                                sections={[{ value: percent_of_completion ? Math.round(percent_of_completion * 100) : 0, color: 'blue' }]}
                                label={
                                    <Text color="blue" weight={400} align="center" size="xs">
                                        {percent_of_completion ? Math.round(percent_of_completion * 100) : 0}%
                                    </Text>
                                }
                            />
                            <div className={s.title_diplome}>
                                <div>
                                    Тема: {theme}
                                </div>
                                <div className={s.title_diplome__name}>
                                    Студнент: {user_student?.name} {user_student?.surname}
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className={s.title_diplome}>
                                <div>
                                    Методические указания:
                                </div>
                                <div>
                                    <button type="button" className="btn btn-default" onClick={() => setIsModalDiplomeEditShow(true)}>
                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            <Timeline active={active}>
                                {stages?.map(stage => (
                                    <Timeline.Item title={stage.title}>
                                        <DiplomeStage
                                            id={stage.id}
                                            graduation_project_id={stage.graduation_project_id}
                                            title={stage.title}
                                            description={stage.description}
                                            is_done={stage.is_done}
                                            deadline_date={stage.deadline_date}
                                        />
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            <EditDiplomeModal
                isModalOpened={isModalDiplomeEditShow}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                id={id}
                updateGraduationProject={{
                    user_student_id: user_student_id,
                    percent_of_completion: percent_of_completion,
                    pattern_of_education: pattern_of_education,
                    theme: theme,
                }}
            />
        </div>
    );
};

export default DiplomeProject;
