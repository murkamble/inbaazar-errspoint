import React, { Component, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from "./actions";
import Category from './containers/Category';
import Products from './containers/Products';
import Orders from './containers/Orders';

function App(){

    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (!auth.authenticate) {
          dispatch(isUserLoggedIn());
      }
      dispatch(getInitialData());
    }, []);

  
    return (
      <div>
          <Switch>
            <PrivateRoute path='/' exact component={Home} />
            <PrivateRoute path='/category' component={Category} />
            <PrivateRoute path='/products' component={Products} />
            <PrivateRoute path='/orders' exact component={Orders} />

            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
          </Switch>
      </div>
    );
  
}

export default App;
