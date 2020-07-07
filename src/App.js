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
import UpdateAccessoryOutgroupPage from './pages/UpdateAccsessoryOutgroupPage';
import PageLoader from './PageLoader';
import AccessoriesLowStockPage from './pages/AccessoriesLowStockPage';
import AccessoryInGroupListPage from './pages/AccessoryInGroupsListPage';
import CreateAccessoryInsPage from './pages/CreateAccessoryInsPage';
import AccessoryInGroupViewPage from './pages/AccessoryInGroupViewPage';
import UpdateAccessoryInsPage from './pages/UpdateAccessoryInsPage';
function App(props) {  
  return(
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-11">
            <LeftPanel />
          </div>
          <div className="col-lg-9 col-md-11">
            <div className="col-12">
              
              <Route path="/home">Beranda</Route>
              <Route path="/accessories/list">
                <AccessoriesListPage loader={PageLoader} />
              </Route>
              
              <Route path="/accessoryoutgroups/list">
                <AccessoryOutgroupsListPage loader={PageLoader}  />
              </Route>

              <Route path="/accessoryoutgroups/add">
                <CreateAccessoryOutsPage loader={PageLoader}  />
              </Route>

              <Route path="/accessoryoutgroups/view">
                <AcessoryOutgroupViewPage loader={PageLoader}  />              
              </Route>


              <Route path="/accessories/create">
                <CreateAccessoryPage loader={PageLoader}  />
              </Route>
              <Route path="/accessories/update">
                <UpdateAccessoryPage loader={PageLoader}  />
              </Route>

              <Route path="/accessoryoutgroups/update">
                <UpdateAccessoryOutgroupPage loader={PageLoader}  />
              </Route>
              <Route path="/accessories/stockalert">
                <AccessoriesLowStockPage />
              </Route>

              <Route path={"/accessoryingroups/list"}>
                <AccessoryInGroupListPage />
              </Route>
              <Route path={"/accessoryingroups/add"}>
                <CreateAccessoryInsPage />
              </Route>

              <Route path={"/accessoryingroups/view"}>
                <AccessoryInGroupViewPage />
              </Route>

              <Route path={"/accessoryingroups/update"}>
                <UpdateAccessoryInsPage />
              </Route>

            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
  