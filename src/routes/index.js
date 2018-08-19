import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Main from '../pages/Main';
import Nav from '../components/Nav';

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
