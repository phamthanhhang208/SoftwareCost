import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Overview from '../views/Overview'
import TechnologyComplexity from '../views/TechnologyComplexity';
import ActorPoints from '../views/ActorPoints';
import UseCasePoints from '../views/UseCasePoints';
import EnvironmentImpact from '../views/EnvironmentImpact';
import SoftwareCost from '../views/SoftwareCost';
import SoftwareEstimation from '../views/SoftwareEstimation';
import Requirement from '../views/Requirement';
import UseCase from '../views/UseCase';

export default function Routes() {
    return (
        <Switch>
           <Route path="/" component={Overview} exact />
           <Route path="/overview" component={Overview} exact />
           <Route path="/project-details/:id/tech-complexity" component= {TechnologyComplexity} exact />
           <Route path="/project-details/:id/actor-points" component= {ActorPoints} exact />
           <Route path="/project-details/:id/usecase-points" component= {UseCasePoints} exact />
           <Route path="/project-details/:id/environment-points" component= {EnvironmentImpact} exact />
           <Route path="/project-details/:id/software-cost" component= {SoftwareCost} exact />
           <Route path="/project-details/:id/software-estimate" component= {SoftwareEstimation} exact />
           <Route path="/project-details/:id/software-requirement" component= {Requirement} exact />
           <Route path="/project-details/:id/usecase-actor" component= {UseCase} exact />
        </Switch> 
    )
}
