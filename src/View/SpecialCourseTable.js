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
                <th className={style1.specCourses} colSpan="3">Спецкурсы</th>
            </tr>
            </thead>
            <tbody>
                    <tr>
                        <td className={style1.courseTime}>{props.course.specialCourse[0].time}</td>
                        <td className={style1.courseName}>{props.course.specialCourse[0].name}</td>
                        <td className={style1.courseTime}>{props.course.specialCourse[1].time}</td>
                        <td className={style1.courseName}>{props.course.specialCourse[1].name}</td>
                    </tr>
                    <tr>
                        <td className={style1.courseTime}>{props.course.specialCourse[2].time}</td>
                        <td className={style1.courseName}>{props.course.specialCourse[2].name}</td>
                        <td className={style1.courseTime}>{props.course.specialCourse[3].time}</td>
                        <td className={style1.courseName}>{props.course.specialCourse[3].name}</td>
                    </tr>
            </tbody>
        </table>
    )
}