import React, {useCallback, useContext, useEffect, useState} from "react";

export const TimeBlock = props => {


    return (
        <div className={props.style.timeBlock}>
            <div className={props.style.hide}>6A</div>
            {Array.from(props.time, time => {
                return <div
                    key={time.index}
                    className={`${props.style.lessonTime}`}
                >
                    {time.startTime}-{time.endTime}
                </div>
            })}
        </div>
    )
}