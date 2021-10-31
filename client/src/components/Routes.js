import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Overview from '../views/Overview'
import ProjectDetails from '../views/ProjectDetails';

export default function Routes() {
    return (
        <Switch>
           <Route path="/" component={Overview} exact />
           <Route path="/overview" component={Overview} exact />
           <Route path="/project-details" component= {ProjectDetails} exact />
        </Switch> 
    )
}
