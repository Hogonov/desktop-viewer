import React from "react";


export const ClassBlock = props => {

    return (
        <div className={props.style.classBlock}>
            <div className={props.style.className}>{props.classroomName}</div>
            {Array.from(props.subjects, subject => {
                try {
                    let classNameLast = subject.index === props.subjects.length ? props.style.lastSubjectBlock : ''
                    return (<div
                            className={`${props.style.subjectBlock} ${subject.update && props.style.change} ${classNameLast}`}
                            key={subject.index}>
                            <div className={`${props.style.subject} ${subject.update && props.style.change}`}
                            >{subject.name === '' ? '' : `${subject.name}`}</div>
                            <div
                                className={props.style.subjectOffice}>{subject.name === '' ? '' : `${subject.office}`}</div>
                        </div>
                    )
                } catch (e) {

                }
            })}
        </div>
    )
}