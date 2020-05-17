import React, { Component } from 'react';
import CardList from './UserList';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import {Link} from 'react-router-dom';
import './Login.css';
import {CardHeader,CardContent,CardActions,Card,TextField,Button,Grid,InputAdornment,createMuiTheme,MuiThemeProvider} from '@material-ui/core'

import {AccountCircle} from '@material-ui/icons';

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '',
            ans: -1
        };
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users  }));
    }
    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value});
        
    }
    authenticate = () => {
        console.log(1)
    }
    render(){
        let filteredarr = this.state.robots.filter(user =>{
            return user.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(this.state.robots.length === 0)
        {
            return(
                <div className = "Login_Bg">
                    <h1 className = "tc Login_Heading">Loading</h1>
                </div>
            )
        }
        else{
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
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
    
}
export default App;