import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Roter} from 'react-router-dom';
import 'materialize-css';

export default function App() {
    const routes = useRoutes();
    return (
        <Roter>
            <div>
                {routes}
            </div>
        </Roter>
    );
}



