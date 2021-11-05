import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' ;
import {ProjectProvider} from './context/projects-context'
import {TableDataProvider} from './context/tableData-context'

ReactDOM.render(
  <ProjectProvider>
    <TableDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </TableDataProvider>
  </ProjectProvider>
  ,
  document.getElementById('root')
);


