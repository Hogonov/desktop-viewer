import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import style1 from './Themes/style1.module.css'
import {TimeBlock} from "./TimeBlock";
import {ClassBlock} from "./ClassBlock";
import {SpecialCourseTable} from "./SpecialCourseTable";


export const ViewPage = () => {

    const {request} = useHttp();
    const [view, setView] = useState({
        date: new Date(),
        session: '',
        editDate: '',
        times: [],
        classrooms: []
    });
    const [clock, setClock] = useState({
        clock: new Date().toLocaleString("ru", {hour: 'numeric', minute: 'numeric'}),
        clockDate: new Date().toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'}),
        clockDay: new Date().toLocaleString("ru", {weekday: 'long'})
    });
    const [announcement, setAnnouncement] = useState({
        announcements: [],
        announcementDir: ''
    });
    const [announcementText, setAnnouncementText] = useState({text: '', date: new Date() - 55000});
    const [specialCourses, setSpecialCourses] = useState({day: '', course: []})
    const [count, setCount] = useState({count: 0});
    const [countAd, setCountAd] = useState({count: 0});
    const [dir, setDir] = useState({name: '', text: '', urlImage: ''});

    const [ad, setAd] = useState({ad: []});
    const [adImage, setAdImage] = useState({url: '', date: new Date() - 70000});
    const schoolId = useParams().id;
    const [school, setSchool] = useState({
        name: ''
    })

    const [flagAd, setFlagAd] = useState(false);
    const [flagDirImage, setFlagDirImage] = useState(false);
    const [flagView, setFlagView] = useState(false);
    const [flagAnnouncement, setFlagAnnouncement] = useState(false);
    const [flagSpecialCourse, setFlagSpecialCourse] = useState(false);


    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/view/get/${schoolId}`, 'GET', null);
            setView({...fetched, date: new Date()});
            setFlagView(fetched.isDataReady)
            setSchool({name: fetched.school})
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataDirector = useCallback(async () => {
        try {
            const fetched = await request(`/api/dir/get_data/${schoolId}`, 'GET', null);
            setDir({...fetched, urlImage: fetched.urlImage});
            setFlagDirImage(fetched.isDataReady);
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataAd = useCallback(async () => {
        try {
            const fetched = await request(`/api/ad/get_data_ad/${schoolId}`, 'GET', null, {"Content-Type": "text/plain"});
            setAd({ad: fetched.ad});
            setFlagAd(fetched.isDataReady)
        } catch (e) {
            console.log(e)
        }
    }, [schoolId, request]);

    const getDataAnnouncement = useCallback(async () => {
        try {
            const fetched = await request(`/api/view/get_announcement/${schoolId}`, 'GET', null);
            setAnnouncement(fetched);
            setAnnouncementText({text: fetched.announcements[count.count], date: new Date()});
            setFlagAnnouncement(fetched.isDataReady);
        } catch (e) {

        }
    }, [schoolId, request]);

    const getSpecialCourses = useCallback(async () => {
        try {
            const fetched = await request(`/api/special_course/get/${schoolId}`, 'GET', null)
            setSpecialCourses(fetched)
            setFlagSpecialCourse(fetched.isDataReady)
        } catch (e) {

        }
    }, [schoolId, request])


    const clockLauncher = () => {
        let timerID = setInterval(() => tick(), 1000)
        return () => clearInterval(timerID)
    };

    const tick = () => {
        let date = new Date();
        setClock({
            clock: date.toLocaleString("ru", {hour: 'numeric', minute: 'numeric', second: 'numeric'}),
            clockDate: date.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'}),
            clockDay: date.toLocaleString("ru", {weekday: 'long'})
        });
    }

    const announcementSwitcher = () => {
        try {
            setAnnouncementText({text: announcement.announcements[count.count], date: new Date()});
            setCount({count: count.count + 1});
            if (count.count === announcement.announcements.length - 1) {
                setCount({count: 0});
            }
        } catch (e) {
        }
    };

    const adSwitcher = () => {
        try {
            setAdImage({url: `/api/ad/get/${ad.ad[countAd.count]._id}`, date: new Date()});
            setFlagAd(true);
            setCountAd({count: countAd.count + 1});
            if (countAd.count === ad.ad.length - 1) {
                setCountAd({count: 0});
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        getData();
        getDataDirector();
        getDataAnnouncement();
        getDataAd();
        getSpecialCourses();
    }, [getData, getDataDirector, getDataAnnouncement, getDataAd, getSpecialCourses]);


    useEffect(() => {
        clockLauncher();
        if (new Date() - view.date >= 60000) {
            setView({...view, date: new Date()});
            getData();
            getDataAnnouncement();
            getDataAd();
            getDataDirector();
            getSpecialCourses();
        }

        if (new Date() - announcementText.date >= 60000) {
            announcementSwitcher();
        }
        if (new Date() - adImage.date >= 60000) {
            adSwitcher();
        }

    });

    if (!flagAd || !flagDirImage || !flagView || !flagAnnouncement) {
        return <Loader/>
    }

    return (
        <div>
            <header className={style1.header}>
                <div className={style1.timetable}>
                    Расписание занятий
                </div>
                <hr className={style1.hr}/>
                <div id="time" className={style1.time}>
                    {clock.clock} | {clock.clockDate} | {clock.clockDay} | <h6 style={{display: 'inline-block'}}
                                                                               className="red-text">{view.editDate}</h6>
                </div>
            </header>

            <div className={style1.container}>
                <div className={style1.logo}>
                    <img src={dir.urlImage} alt="logo"/>
                    <h4>{school.name}</h4>
                </div>

                <div className={style1.attention}>
                    <div className={style1.mainAtt}>Объявление</div>
                    <div className={style1.txt}>{announcementText.text}</div>
                </div>

                <div className={style1.director}>
                    <h3>Директор</h3>
                    <h4>
                        <svg className={style1.phone}/>
                        {dir.name}</h4>
                </div>
            </div>


            <div className={style1.firstTable}>

                <TimeBlock time={view.times}/>
                {Array.from(view.classrooms, classroom => {
                    return (
                        <div key={classroom.index}>
                            <ClassBlock
                                classroomName={classroom.name}
                                subjects={classroom.subjects}
                                time={view.times}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={style1.secondTable}>

                <TimeBlock time={view.times}/>
                {Array.from(view.classrooms, classroom => {
                    return (
                        <div key={classroom.index}>
                            <ClassBlock
                                classroomName={classroom.name}
                                subjects={classroom.subjects}
                                time={view.times}
                            />
                        </div>
                    )
                })}
            </div>


            <footer className={style1.foot}>
                <SpecialCourseTable
                    course={specialCourses}
                />
                <div className={style1.ad}>
                    <img src={adImage.url} alt="ad"/>
                </div>
                <div className={style1.qr}>
                    <img
                        src="http://qrcoder.ru/code/?localhost%3A3000&8&0"
                        alt="qr"/>
                </div>
            </footer>

        </div>
    )
};