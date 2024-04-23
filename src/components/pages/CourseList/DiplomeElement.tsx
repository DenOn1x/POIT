import React, {FC} from 'react';
import {Accordion, ProgressBar} from "react-bootstrap";
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import {IUser} from "../../../mobx/stores/user.store";

export interface IGraduationProject {
    id: number | undefined,
    user_student_id: number | undefined,
    percent_of_completion: number | undefined,
    theme: string | undefined,
    pattern_of_education: string | undefined,
    stages: Array<IGraduationProjectStage> | undefined,
}

export interface IGraduationProjectForList {
    id: number | undefined,
    user_student_id: number | undefined,
    percent_of_completion: number | undefined,
    theme: string | undefined,
    pattern_of_education: string | undefined,
    stages: Array<IGraduationProjectStage> | undefined,
    user: IUser
}

export interface IGraduationProjectStage {
    id: number,
    graduation_project_id: number,
    title: string,
    description: string,
    is_done: boolean,
    deadline_date: string
}

const GraduateElement: FC<IGraduationProject> = ({id, user_student_id, percent_of_completion, theme, pattern_of_education, stages}) => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <CircularProgress variant="determinate" value={percent_of_completion != undefined? (percent_of_completion * 100) : (percent_of_completion)} />
                        Тема: {theme}
                    </Accordion.Header>
                    <Accordion.Body>
                        {stages?.map(stage => (
                            <div>
                                <Accordion>
                                    <Accordion.Item eventKey={String(stage.id)}>
                                        <Accordion.Header>
                                            {stage.title}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <>
                                                <div>{stage.description}</div>
                                                <div>СТАТУС: {stage.is_done ? (<>Сделано</>): (<>Не сделано</>)}</div>
                                                <div>{stage.deadline_date}</div>
                                            </>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default GraduateElement;