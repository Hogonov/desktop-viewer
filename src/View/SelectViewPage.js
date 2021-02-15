import React, {useCallback, useContext, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../components/Loader";
import style from './Themes/SelectsViewPage.module.css'


export const SelectViewPage = () => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [options, setOptions] = useState({schools: []});
    const themes = [
        {label: 'Оформление 1', value: 'style1'},
        {label: 'Оформление 2', value: 'style2'},
        {label: 'Оформление 3', value: 'style3'},
        {label: 'Оформление 4', value: 'style4'}
    ]
    const [form, setForm] = useState({
        school: '',
        theme: {label: 'Оформление 1', value: 'style1'},
    });

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/table/get_school`, 'GET', null);
            setOptions(fetched);
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        getData();
    }, [getData]);


    const changeHandler = (event, action) => {
        setForm({...form, [action.name]: event});
    };
    const viewHandler = () => {
        if (form.school === '') {
            message('Выберете школу')
        } else {
            window.location.href = `/view/${form.school.value}/${form.theme.value}`
        }
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={style.main}>
            <svg className={style.logo}/>
            <div className={style.form}>
                <div className={style.title}>Настройки приложения</div>
                <Select

                    onChange={changeHandler}
                    id="school"
                    placeholder="Выберите школу"
                    className={style.selector}
                    options={options.schools}
                    value={form.school}
                    name="school"
                />
                <Select
                    onChange={changeHandler}
                    id="theme"
                    placeholder="Выберите оформление расписания"
                    className={`${style.selector}`}
                    options={themes}
                    value={form.theme}
                    name="theme"
                />
                <Button
                    className={`btn ${style.button}`}
                    style={{marginRight: 10}}
                    disabled={loading}
                    onClick={viewHandler}
                >
                    Выбрать школу
                </Button>
            </div>
        </div>
    )
};