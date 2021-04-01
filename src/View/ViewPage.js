import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import style from './Themes/style.module.css'
import {TimeBlock} from "./TimeBlock";
import {ClassBlock} from "./ClassBlock";
import {SpecialCourseTable} from "./SpecialCourseTable";
import settings from '../config/settings.json'


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
    const theme = useParams().name;
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
            const fetched = await request(`${settings.url}/api/view/get/${schoolId}`, 'GET', null);
            setView({...fetched, date: new Date()});
            setFlagView(fetched.isDataReady)
            setSchool({name: fetched.school})
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataDirector = useCallback(async () => {
        try {
            const fetched = await request(`${settings.url}/api/dir/get_data/${schoolId}`, 'GET', null);
            setDir({...fetched, urlImage: settings.url + fetched.urlImage});
            setFlagDirImage(fetched.isDataReady);
        } catch (e) {

        }
    }, [schoolId, request]);

    const getDataAd = useCallback(async () => {
        try {
            const fetched = await request(`${settings.url}/api/ad/get_data_ad/${schoolId}`, 'GET', null, {"Content-Type": "text/plain"});
            setAd({ad: fetched.ad});
            setFlagAd(fetched.isDataReady)
        } catch (e) {
            console.log(e)
        }
    }, [schoolId, request]);

    const getDataAnnouncement = useCallback(async () => {
        try {
            const fetched = await request(`${settings.url}/api/view/get_announcement/${schoolId}`, 'GET', null);
            setAnnouncement(fetched);
            setAnnouncementText({text: fetched.announcements[count.count], date: new Date()});
            setFlagAnnouncement(fetched.isDataReady);
        } catch (e) {

        }
    }, [schoolId, request]);

    const getSpecialCourses = useCallback(async () => {
        try {
            const fetched = await request(`${settings.url}/api/special_course/get/${schoolId}`, 'GET', null)
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
            setAdImage({url: `${settings.url}/api/ad/get/${ad.ad[countAd.count]._id}`, date: new Date()});
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
        //clockLauncher();
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
            <header className={style.header}>
                <div className={style.timetable}>
                    Расписание занятий
                </div>
                <hr className={style.hr}/>
                <div id="time" className={style.time}>
                    {clock.clock} | {clock.clockDate} | {clock.clockDay} | <h6 style={{display: 'inline-block'}}
                                                                               className={style.editDate}>{view.editDate}</h6>
                </div>
            </header>

            <div className={style.container}>
                <div className={style.logo}>
                    <img width="10px" src={dir.urlImage} alt="logo"/>
                    <div className={style.infBlock}>
                        <div className={style.schoolName}>{school.name}</div>
                        <div>
                            <svg className={style.phone}/>
                            {dir.phone}
                        </div>
                        <div>
                            <svg className={style.email}/>
                            {dir.email}
                        </div>
                    </div>

                </div>

                <div className={style.attention}>
                    <div className={style.mainAtt}>Объявление</div>
                    <div className={style.txt}>{announcementText.text}</div>
                </div>

                <div className={style.director}>
                    <h3>Директор</h3>
                    <h5>{dir.name}</h5>
                </div>
            </div>


            <div className={style.firstTable}>
                <TimeBlock time={view.times}  style={style}/>
                {Array.from(view.classrooms[0], classroom => {
                    return (
                        <div key={classroom.index}>
                            <ClassBlock
                                style={style}
                                classroomName={classroom.name}
                                subjects={classroom.subjects}
                                time={view.times}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={style.secondTable}>

                <TimeBlock time={view.times}  style={style}/>
                {Array.from(view.classrooms[1], classroom => {
                    return (
                        <div key={classroom.index}>
                            <ClassBlock
                                style={style}
                                classroomName={classroom.name}
                                subjects={classroom.subjects}
                                time={view.times}
                            />
                        </div>
                    )
                })}
            </div>


            <footer className={style.foot}>
                <SpecialCourseTable
                    style={style}
                    course={specialCourses}
                />
                <div className={style.ad}>
                    <img src={adImage.url} alt="ad"/>
                </div>
                <div className={style.qr}>
                </div>
            </footer>

        </div>
    )
};