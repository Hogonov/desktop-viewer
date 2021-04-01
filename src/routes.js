import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ViewPage} from './View/ViewPage'
import {SelectViewPage} from "./View/SelectViewPage";



export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <SelectViewPage/>
            </Route>
            <Route path="/view/:id" exact>
                <ViewPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};
