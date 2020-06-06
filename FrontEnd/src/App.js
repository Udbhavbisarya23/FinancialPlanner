import React from 'react';
import './App.css';
import{BrowserRouter,Route,Switch,Link,Redirect} from "react-router-dom";
import Home from './Pages/Home/Home';
import Errorp from './Pages/Errorp';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import SideBar from './Layout/Sidebar'
import Charts from './Pages/ChartPage'
import Details from './Pages/Details/Details';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      status: 'NOT_LOGGED_IN',
      username: ''
    }
  }
  loginCallBack = (username) => {
    console.log(username + " in main app.js")
    this.setState({
      status: 'LOGGED_IN',
      username: username
    })
  }
  render(){
  return (
    <BrowserRouter className = "App">
    <Switch>
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/Login" 
      render = {props => (
        <Login {... props} appCallBack = {this.loginCallBack}/>
      )} />
      <Route exact path = "/Sign-Up" 
      render = {props => (
        <SignUp {... props} appCallBack = {this.loginCallBack}/>
      )} />
      <Route exact path = "/404" component = {Errorp} />
      <Route exact path = "/Charts" component = {Charts} />   
      <Route exact path = "/Sidebar" component = {SideBar} />  

      <Route exact path = "/Details" 
      render = {props => (
        <Details {... props} username = {this.state.username} status = {this.state.status}/>
      )} />  
      <Route exact path = "/Dashboard" component = {SideBar} />      
      <Redirect to = "/404" />
      </Switch>  
    </BrowserRouter>
  );
  }
}

export default App;
