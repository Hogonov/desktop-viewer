import React, {useCallback, useContext, useEffect, useState} from "react";


export const ClassBlock = props => {

    return (
        <div className={props.style.classBlock}>
            <div className={props.style.className}>{props.classroomName}</div>
            {Array.from(props.subjects, subject => {
                return (<div className={props.style.subjectBlock} key={subject.index}>
                        <div className={`${props.style.subject} ${subject.update && props.style.change}`}
                        >{subject.name === '' ? '|' : `${subject.name}`}</div>
                        <div className={props.style.subjectOffice}>{subject.name === '' ? '|' : `${subject.office}`}</div>
                    </div>
                )
            })}
        </div>
    )
}