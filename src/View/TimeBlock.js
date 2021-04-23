import React from "react";

export const TimeBlock = props => {


    return (
        <div className={props.style.timeBlock}>
            {Array.from(props.time, time => {
                try {
                    let classNameFirst = time.index === 1 ? props.style.firstLessonTime : ''
                    let classNameLast = time.index === props.time.length ? props.style.lastLessonTime : ''
                    let date = new Date()
                    let timeEnd = time.endTime.split(':')
                    date.setHours(timeEnd[0])
                    date.setMinutes(timeEnd[1])
                    let pastLesson = date < new Date() ? props.style.pastLesson : ''
                    return <div
                        key={time.index}
                        className={`${props.style.lessonTime} ${classNameFirst} ${classNameLast} ${pastLesson}`}
                    >
                        {time.startTime}-{time.endTime}
                    </div>
                } catch (e) {

                }
            })}
        </div>
    )
}