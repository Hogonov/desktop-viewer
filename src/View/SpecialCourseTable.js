import React, {useCallback, useContext, useEffect, useState} from "react";
import style1 from './Themes/style1.module.css'
import style2 from './Themes/style2.module.css'
import style3 from './Themes/style3.module.css'
import style4 from './Themes/style4.module.css'

export const SpecialCourseTable = props => {

    return (
        <table className={style1.courses}>
            <thead>
            <tr>
                <th className={style1.hideTh}/>
                <th className={style1.specCourses} colSpan="7">Спецкурсы</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {Array.from(props.course.specialCourse, course => {
                    return (<>
                            <td className={style1.courseTime}>{course.time}</td>
                            <td className={style1.courseName}>{course.name}</td>
                        </>
                    )
                })}
            </tr>
            </tbody>
        </table>
    )
}