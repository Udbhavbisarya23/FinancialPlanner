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
    handleDateChange = (data) => {
      this.setState({})
    }
    render(){  
    return(
    <div className = 'tc SignUp_Bg'>
          <MuiThemeProvider theme = {theme}>
        <h1 className = "grow SignUp_Heading" >Sign Up</h1>  
        <Card className = "SignUp_Card">
                <form >
                <div className = "Horizontal_Group">
                <TextField
                  className="SignUp_Fields"
                  id="input-with-icon-textfield"
                  label="First Name"
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