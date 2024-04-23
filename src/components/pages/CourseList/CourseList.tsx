import React, {FC, ReactNode} from 'react';
import {Accordion, ProgressBar} from 'react-bootstrap';
import {ICourseProjectStage, IDiscipline} from "../../../interfaces/course/ICourseProject";
import CircularProgress from "@mui/material/CircularProgress";

interface ICourseProject {
    id: number,
    discipline_id: number,
    user_student_id: number,
    percent_of_complete: number,
    stages: Array<ICourseProjectStage>,
    discipline: IDiscipline
}

interface ICourseList {
    projects: ICourseProject[] | undefined
    children?: ReactNode,
}

const CourseList: FC<ICourseList> = ({projects}) => {
    return (
        <div>
            {projects?.map(test => (
                <div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <CircularProgress variant="determinate" value={test.percent_of_complete != undefined? (test.percent_of_complete * 100) : (test.percent_of_complete)} />
                                {test.discipline.discipline_name}
                            </Accordion.Header>
                            <Accordion.Body>
                                <ProgressBar now={test.percent_of_complete} label={`${test.percent_of_complete}%`} visuallyHidden />
                                {test.stages.map(stage => (
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
            ))}
        </div>
    );
};

export default CourseList;