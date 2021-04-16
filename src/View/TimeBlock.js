import React, {useCallback, useContext, useEffect, useState} from "react";

export const TimeBlock = props => {


    return (
        <div className={props.style.timeBlock}>
            {Array.from(props.time, time => {
                let classNameFirst = time.index === 1 ? props.style.firstLessonTime : ''
                let classNameLast = time.index === props.time.length ? props.style.lastLessonTime : ''
                return <div
                    key={time.index}
                    className={`${props.style.lessonTime} ${classNameFirst} ${classNameLast}`}
                >
                    {time.startTime}-{time.endTime}
                </div>
            })}
        </div>
    )
}