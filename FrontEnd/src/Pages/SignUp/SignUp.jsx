import React from 'react';
import {Link} from 'react-router-dom';
import Multistep from 'react-multistep';
import 'tachyons';
import './SignUp.css';
import {CardHeader,CardContent,CardActions,Card,TextField,Button,Grid,InputAdornment,createMuiTheme,MuiThemeProvider} from '@material-ui/core'

import {AccountCircle} from '@material-ui/icons';

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        display: "flex",
        "flex-direction": "column",
        "padding-top": "2vh",
        "padding-bottom":"2vh",
        "padding-right": "3vh"
      }
    }
  }
})
class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      username: '',
      salary: '',
      expenses: '',
      age: '',
    }
  }
    handleFnameChange = (event)=>{
      this.setState({fname: event.target.value})
    }
    handleLnameChange = (event)=>{
      this.setState({lname: event.target.value})
    }
    handleUsernameChange = (event)=>{
      this.setState({username: event.target.value})
    }
    handleEmailChange= (event)=>{
      this.setState({email: event.target.value})
    }
    handlePasswordChange = (event)=>{
      this.setState({password: event.target.value})
    }
    handleSalaryChange = (event)=>{
      this.setState({salary: event.target.value})
    }
    handleExpenseChange = (event)=>{
      this.setState({expenses: event.target.value})
    }
    handleAgeChange = (event)=>{
      this.setState({age: event.target.value})
    }
    handleSubmit = () => {
      let {fname,lname,email,password,username,salary,expenses,age} = this.state;
      fetch('http://localhost:4000/signup', {
        method: 'post',
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          username: username,
          salary: salary,
          expenses: expenses,
          age: age
        }),
        headers: {"Content-Type":"application/json"}
      })
      .then(response => response.json())
      .then(console.log)
    }
    render(){  
    return(
    <div className = 'tc SignUp_Bg'>
          <MuiThemeProvider theme = {theme}>
        <h1 className = "grow SignUp_Heading" >Sign Up</h1>  
        <Card className = "SignUp_Card">
                <form className = "SignUp_Form">
                <div className = "Horizontal_Group">
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="First Name"
                  value = {this.state.fname}
                  onChange = {this.handleFnameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Last Name"
                  value = {this.state.lname}
                  onChange = {this.handleLnameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                </div>
                <div className = "Horizontal_Group">
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Username"
                  value = {this.state.username}
                  onChange = {this.handleUsernameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  value = {this.state.password}
                  onChange = {this.handlePasswordChange}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                </div>
                <div className = "Horizontal_Group">
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Email Id"
                  value = {this.state.email}
                  onChange = {this.handleEmailChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Age"
                  value = {this.state.age}
                  onChange = {this.handleAgeChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                </div>
                <div className = "Horizontal_Group">
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Salary(Monthly)"
                  value = {this.state.salary}
                  onChange = {this.handleSalaryChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="Expenses(Monthly)"
                  value = {this.state.expenses}
                  onChange = {this.handleExpenseChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                </div>
                </form>
                <Button
                onClick = {this.handleSubmit}>
                  send
                </Button>
              </Card>
        <Link to = '/Login'>
          <div className = "Redirect_Button bg-animate bg-near-blue inline-flex items-center tc pa2">  
          <span style = {{color:'#ccffff'}}class="Redirect_Text f6 ml3 pr2 pv2 ma3">Already a Member?Login Now!</span>
          </div>  
        </Link>
        <Link to = '/'>
          <div className = "Redirect_Button bg-animate bg-near-blue inline-flex items-center tc pa2">  
          <span style = {{color:'#ccffff'}} className="Redirect_Text f6 ml3 pr2 pv2 ma3">Back Home</span>
          </div>                    
        </Link>
        </MuiThemeProvider>
       
    </div>
    )
}
}

export default SignUp;