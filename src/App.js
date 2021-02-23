import React, {useEffect} from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Roter} from 'react-router-dom';
import 'materialize-css';

export default function App() {
    const routes = useRoutes();
    useEffect(() => {
        if (window.location.href.indexOf("/view") === -1) {
            document.getElementById('bodyId').className = 'anotherBack'
        } else {
            document.getElementById('bodyId').className = 'whiteBack'
        }
    }, [routes])

    return (
        <Roter>
            <div>
                {routes}
            </div>
        </Roter>
    );
}



