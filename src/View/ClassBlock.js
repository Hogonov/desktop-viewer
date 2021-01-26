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
                return <div key={subject.index}
                            className={`${style1.subject} ${subject.update && style1.change}`}
                >{subject.name === '' ? '|' : `${subject.name} | ${subject.office} каб.`}
                </div>
            })}
        </div>
    )
}