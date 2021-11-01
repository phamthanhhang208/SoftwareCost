import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Overview from '../views/Overview'
import ProjectDetails from '../views/ProjectDetails';
import UseCasePoint from '../views/TechnologyComplexity';

export default function Routes() {
    return (
        <Switch>
           <Route path="/" component={Overview} exact />
           <Route path="/overview" component={Overview} exact />
           <Route path="/project-details" component= {ProjectDetails} exact />
           <Route path="/project-details/:id/tech-complexity" component= {UseCasePoint} exact />
        </Switch> 
    )
}
