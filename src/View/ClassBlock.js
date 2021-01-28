import React, {useCallback, useContext, useEffect, useState} from "react";
import style1 from './Themes/style1.module.css'
import style2 from './Themes/style2.module.css'
import style3 from './Themes/style3.module.css'
import style4 from './Themes/style4.module.css'

export const ClassBlock = props => {

    return (
        <div className={style1.classBlock}>
            <div className={style1.className}>{props.classroomName}</div>
            {Array.from(props.subjects, subject => {
                return (<div className={style1.subjectBlock} key={subject.index}>
                        <div className={`${style1.subject} ${subject.update && style1.change}`}
                        >{subject.name === '' ? '|' : `${subject.name}`}</div>
                        <div className={style1.subjectOffice}>{subject.name === '' ? '|' : `${subject.office}`}</div>
                    </div>
                )
            })}
        </div>
    )
}