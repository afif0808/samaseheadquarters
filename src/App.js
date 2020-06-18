import React, { useState ,useEffect} from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import LeftPanel from './LeftPanel';
import AccessoriesListPage from './pages/AccessoriesListPage'
import AccessoryOutgroupsListPage from './pages/AccessoryOutgroupsListPage'
import CreateAccessoryOutsPage from './pages/CreateAccessoryOutsPage';
import UpdateAccessoryPage from './pages/UpdateAccessoryPage'
import CreateAccessoryPage from './pages/CreateAccessoryPage'
import AcessoryOutgroupViewPage from './pages/AccessoryOutgroupViewPage';
function App(props) {  
  return(
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <LeftPanel />
          </div>
          <div className="col-10">
            <div className="col-12">
              
            
              
  <Route path="/home">Beranda</Route>
              <Route path="/accessories/list">
                <AccessoriesListPage />
              </Route>
              
              <Route path="/accessoryoutgroups/list">
                <AccessoryOutgroupsListPage />
              </Route>

              <Route path="/accessoryoutgroups/add">
                <CreateAccessoryOutsPage />
              </Route>

              <Route path="/accessoryoutgroups/view">
                <AcessoryOutgroupViewPage />              
              </Route>


              <Route path="/accessories/create">
                <CreateAccessoryPage />
              </Route>
              <Route path="/accessories/update">
                <UpdateAccessoryPage />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
  