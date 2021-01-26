import React, {useCallback, useContext, useEffect, useState} from "react";
import style1 from './Themes/style1.module.css'
import style2 from './Themes/style2.module.css'
import style3 from './Themes/style3.module.css'
import style4 from './Themes/style4.module.css'

export const TimeBlock = props => {


    return (
        <div className={style1.timeBlock}>
            <div className={style1.hide}>6A</div>
            {Array.from(props.time, time => {
                return <div key={time.index} className={style1.lessonTime}>{time.startTime}-{time.endTime}</div>
            })}
        </div>
    )
}