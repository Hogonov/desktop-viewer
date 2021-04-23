import React, {useCallback, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../components/Loader";
import style from './Themes/SelectsViewPage.module.css'
import settings from '../config/settings.json'

export const SelectViewPage = () => {
    const message = useMessage();
    const history = useHistory();
    const {loading, request} = useHttp();
    const [options, setOptions] = useState({schools: []});
    const [form, setForm] = useState({
        school: '',
        theme: {label: 'Оформление 1', value: 'style1'},
    });

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`${settings.url}/api/table/get_school`, 'GET', null);
            setOptions(fetched);
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        try {
            getData().then()
        } catch (e) {
        }
    }, [getData]);


    const changeHandler = (event, action) => {
        try {
            setForm({...form, [action.name]: event})
        } catch (e) {
        }
    };
    const viewHandler = () => {
        try {
            if (form.school === '') {
                message('Выберете школу')
            } else {
                history.push(`/view/${form.school.value}`)
            }
        } catch (e) {
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