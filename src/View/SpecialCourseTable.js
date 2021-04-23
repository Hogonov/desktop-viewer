import React from "react";


export const SpecialCourseTable = props => {

    return (
        <table className={props.style.courses}>
            {props.course.specialCourse.length > 0 && <>
                <thead>
                <tr>
                    <th className={props.style.hideTh}/>
                    <th className={props.style.specCourses} colSpan="7">Спецкурсы</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {Array.from(props.course.specialCourse, course => {
                        try {
                            return (<>
                                    <td className={props.style.courseTime}>{course.time}</td>
                                    <td className={props.style.courseName}>{course.name}</td>
                                </>
                            )
                        } catch (e) {

                        }
                    })}
                </tr>
                </tbody>
            </>}
        </table>
    )
}