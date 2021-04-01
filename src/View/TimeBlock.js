import React, {useCallback, useContext, useEffect, useState} from "react";

export const TimeBlock = props => {


    return (
        <div className={props.style.timeBlock}>
            {/*<div className={props.style.hide}>|</div>*/}
            {Array.from(props.time, time => {
                return <div
                    key={time.index}
                    className={`${props.style.lessonTime} ${time.index === props.time.length ? props.style.lastLessonTime : ''}`}
                >
                    {time.startTime}-{time.endTime}
                </div>
            })}
        </div>
    )
}