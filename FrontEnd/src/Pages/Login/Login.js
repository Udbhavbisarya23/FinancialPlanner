import React, { Component } from 'react';
import CardList from './UserList';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import {Link} from 'react-router-dom';
import './Login.css';
import {CardHeader,CardContent,CardActions,Card,TextField,Button,Grid,InputAdornment,createMuiTheme,MuiThemeProvider} from '@material-ui/core'

import {AccountCircle} from '@material-ui/icons';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            robots: [],
            username: '',
            password: '',
            ans: -1
        };
    }
    handleSubmit = () => {
      console.log("hi")
      fetch('http://localhost:4000/login', {
        method: 'post',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
        headers: {"Content-Type":"application/json"}
      })
      .then(response => response.json())
      .then(data => {
        if(data!= 'false'){
        console.log(data)
        this.props.appCallBack(data)
        this.props.history.push("/Details")
        }
        else{
          alert("Incorrect Username/Password")
        }
      })
      // fetch('http://localhost:4000')
      // .then(res => res.json())
      // .then(console.log)
    }
    handleUserChange = (event) => {
      this.setState({username: event.target.value})
      
    }
    handlePasswordChange = (event) => {
      this.setState({password: event.target.value})
    }
    authenticate = () => {
        console.log(1)
    }
    render(){
        
        return(
            <div className = 'tc Login_Bg'>
                <h1 className = "tc grow Login_Heading" >Login</h1>           
                {/* <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <CardList robots = {filteredarr} auth = {this.authenticate}/>
                </Scroll> */}\
                <Card className = "Login_Card">
                <TextField
                  className="Login_Fields"
                  id="input-with-icon-textfield"
                  label="Username"
                  value = {this.state.username}
                  onChange = {this.handleUserChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="Login_Fields"
                  id="input-with-icon-textfield"
                  label="Password"
                  value = {this.state.password}
                  onChange = {this.handlePasswordChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                onClick = {this.handleSubmit}>
                  send
                </Button>
                </Card>
                <Link to = '/Sign-Up'>
                  <div className = "underline bg-animate bg-near-blue inline-flex items-center tc pa2 Redirect_Button">  
                  <span style = {{color:'#ccffff'}} className="f6 ml3 pr2 Redirect_Text">Not a Member?Sign Up Here</span>
                  </div>  
                </Link>
                <Link to = '/'>
                  <div className = "no-underline bg-animate bg-near-blue inline-flex items-center tc pa2 Redirect_Button">  
                  <span style = {{color:'#ccffff'}} className ="f6 ml3 pr2 Redirect_Text">Back Home</span>
                  </div>                    
                </Link>
                 
               
            </div>
            
        );
        }
    
    
}
export default Login;