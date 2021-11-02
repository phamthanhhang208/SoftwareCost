import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Overview from '../views/Overview'
import ProjectDetails from '../views/ProjectDetails';
import TechnologyComplexity from '../views/TechnologyComplexity';
import ActorPoints from '../views/ActorPoints';

export default function Routes() {
    return (
        <Switch>
           <Route path="/" component={Overview} exact />
           <Route path="/overview" component={Overview} exact />
           <Route path="/project-details" component= {ProjectDetails} exact />
           <Route path="/project-details/:id/tech-complexity" component= {TechnologyComplexity} exact />
           <Route path="/project-details/:id/actor-points" component= {ActorPoints} exact />
        </Switch> 
    )
}
