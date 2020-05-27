import React from 'react';
import './App.css';
import{BrowserRouter,Route,Switch,Link,Redirect} from "react-router-dom";
import Home from './Pages/Home/Home';
import Errorp from './Pages/Errorp';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import SideBar from './Layout/Sidebar'
import Charts from './Pages/ChartPage'

function App() {
  return (
    <BrowserRouter className = "App">
    <Switch>
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/Login" component = {Login} />
      <Route exact path = "/404" component = {Errorp} />
      <Route exact path = "/Sign-Up" component = {SignUp} /> 
      <Route exact path = "/Charts" component = {SideBar} />     
      <Redirect to = "/404" />
      </Switch>  
    </BrowserRouter>
  );
}

export default App;
