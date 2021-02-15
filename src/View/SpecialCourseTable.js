import React, {useCallback, useContext, useEffect, useState} from "react";


export const SpecialCourseTable = props => {

    return (
        <table className={props.style.courses}>
            <thead>
            <tr>
                <th className={props.style.hideTh}/>
                <th className={props.style.specCourses} colSpan="7">Спецкурсы</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {Array.from(props.course.specialCourse, course => {
                    return (<>
                            <td className={props.style.courseTime}>{course.time}</td>
                            <td className={props.style.courseName}>{course.name}</td>
                        </>
                    )
                })}
            </tr>
            </tbody>
        </table>
    )
}