import React from 'react';
import Sidebar from '../../Layout/Sidebar'
import './Details.css';
import {Button,Radio,Collapse,List,TextField, ListItem,FormControlLabel,Divider} from '@material-ui/core'
import {Redirect} from 'react-router-dom';

class Details extends React.Component{
    constructor(props){
        
        super(props);
        console.log(this.props)
        this.state = {
            assets: false,
            debts: false,
            email: false,
            plan: false,
            assetsnew: true,
            emailnew: true,
            debtsnew: true,
            assetname: '',
            assetvalue: '',
            debtname: '',
            debtvalue: '',
            newEmail: '',
            oldEmail: '',
            emergency: '',
            no_of_kids: '',
            ret_age: '',
            plan_id: ''
        }
    }
    handleAssetsChange = () => {
        this.setState((prevState) => ({
            assets : !prevState.assets
        }))
    }
    handleDebtChange = () => {
        this.setState((prevState) => ({
            debts : !prevState.debts
        }))
    }
    handleEmailChange = () => {
        this.setState((prevState) => ({
            email : !prevState.email
        }))
    }
    handlePlanChange = () => {
        this.setState((prevState) => ({
            plan : !prevState.plan
        }))
    }
    handleAssetsDropdown = (main,arr) => {
        // let arr = ["Name of Asset","Value of Asset"]
        let data = []
        arr.forEach(element => {
            data.push(
                <ListItem className = "Details_Page_List_Item">
            <TextField className = "space" id="standard-basic" label={element} />
            </ListItem>
            )
        });
        return data
    }
    handleNewAsset = (val) => {
        this.setState({assetsnew: val})
    }
    handleNewDebt = (val) => {
        this.setState({debtsnew: val})
    }
    handleNewEmail = (val) => {
        this.setState({emailnew: val})
    }
    handleSubmit = () => {
        if(this.state.assets === true){
            if(this.state.assetname === '' || this.state.assetvalue === ''){
                alert("Please enter asset details")
            }
            else{
                let variable = "";
                if(this.state.assetsnew === true){
                    variable = "true";
                }
                else{
                    variable = "false";
                }
                console.log(this.props.username[0].username)
                fetch('http://localhost:5000/assets', {
                    method: 'post',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: this.props.username[0].username,
                        check: variable,
                        name_asset: this.state.assetname,
                        value_asset: this.state.assetvalue
                    })
                })
            }
        }
            if(this.state.debts === true){
                if(this.state.debtname === '' || this.state.debtvalue === ''){
                    alert("Please enter Debt details")
                }
                else{
                    let variable = "";
                    if(this.state.debtsnew === true){
                        variable = "true";
                    }
                    else{
                        variable = "false";
                    }
                    console.log(this.props.username[0].username)
                    fetch('http://localhost:5000/debts', {
                        method: 'post',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: this.props.username[0].username,
                            check: variable,
                            name_debt: this.state.debtname,
                            price_debt: this.state.debtvalue
                        })
                    })

            }
        }
            if(this.state.email === true){
                if(this.state.newEmail === '' ){
                    alert("Please enter Email details")
                }
                else{
                    let variable = "";
                    if(this.state.emailnew === true){
                        variable = "true";
                    }
                    else{
                        variable = "false";
                    }
                    console.log(this.props.username[0].username)
                    fetch('http://localhost:5000/emails', {
                        method: 'post',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: this.props.username[0].username,
                            check: variable,
                            email_id: this.state.newEmail,
                            old: this.state.old
                        })
                    })

            }
        } 
        if(this.state.plan === true){
            if(this.state.plan_id == '' || this.state.no_of_kids == '' || this.state.emergency == '' || this.state.ret_age == ''){
                alert("Please Enter Plan details")
            }
            else{
                fetch('http://localhost:5000/plans', {
                        method: 'post',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: this.props.username[0].username,
                            plan_id: this.state.plan_id,
                            ret_age: this.state.ret_age,
                            emergency_savings: this.state.emergency,
                            no_of_kids: this.state.no_of_kids
                        })
                    })

            }
        }        
       
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }
    render(){
        // if(this.props.status === "NOT_LOGGED_IN"){
        //     return(
        //         <Redirect to = "/404" />
        //     )
        // }
        // else{
        //     console.log(this.props.status)
        return(
            <div className = "Details_Page">
            <Sidebar />
            <div className = "Details_Page_Main_Content">
                <div className = "Details_Page_Heading">
                    Details Updation
                </div>
                {/* <Divider className = "Dash_Page_Divider" /> */}
                <div className = "Details_Page_Radio_Buttons_Layout">
                <div className = "Details_Page_Radio_Buttons_Column">
                    <div className = "Details_Page_Radio_Buttons_Column_Heading">
                    <div className = "Details_Page_SubHeading">
                        Assets
                    </div>
                    <div className = "Details_Page_Radio_Button">
                    <Radio
                        checked={this.state.assets}
                        onClick={this.handleAssetsChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                        size = "small"
                    />
                    </div>
                    </div>
                    
                    <div className = "Details_Page_Input_Fields">
                    <Collapse in={this.state.assets} timeout="auto" unmountOnExit className = "Details_Page_Collapse">
                    <FormControlLabel 
                    checked={!this.state.assetsnew} 
                    onClick = {() => {
                        this.handleNewAsset(false)
                    }} 
                    control={<Radio color="primary" size = "small" />} 
                    label="Existing" />
                    <FormControlLabel
                     checked={this.state.assetsnew} 
                     onClick = {() => {
                        this.handleNewAsset(true)
                    }} 
                     control={<Radio color="primary" size="small" />} 
                     label="New" />
                    <List component="div" disablePadding className = "Details_Page_List">
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label="Name of Asset" name = "assetname" value = {this.state.assetname} onChange = {this.handleChange} />
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Value of Asset" name = "assetvalue" value = {this.state.assetvalue} onChange = {this.handleChange}/>
                    </ListItem>
                    </List>
                    </Collapse>
                    </div>
                </div> 

                <div className = "Details_Page_Radio_Buttons_Column">
                    <div className = "Details_Page_Radio_Buttons_Column_Heading">
                    <div className = "Details_Page_SubHeading">
                        Debts
                    </div>
                    <div className = "Details_Page_Radio_Button">
                    <Radio
                        checked={this.state.debts}
                        onClick={this.handleDebtChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                        size = "small"
                    />
                    </div>
                    </div>
                    <div className = "Details_Page_Input_Fields">
                    <Collapse in={this.state.debts} timeout="auto" unmountOnExit className = "Details_Page_Collapse">
                    <FormControlLabel 
                    checked={!this.state.debtsnew} 
                    onClick = {() => {
                        this.handleNewDebt(false)
                    }} 
                    control={<Radio color="primary" size = "small" />} 
                    label="Existing" />
                    <FormControlLabel
                     checked={this.state.debtsnew} 
                     onClick = {() => {
                        this.handleNewDebt(true)
                    }} 
                     control={<Radio color="primary" size="small" />} 
                     label="New" />
                     <List component="div" disablePadding className = "Details_Page_List">
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label="Name of Debt" name = "debtname" value = {this.state.debtname} onChange = {this.handleChange}/>
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Value of Debt" name = "debtvalue" value = {this.state.debtvalue} onChange = {this.handleChange}/>
                    </ListItem>
                    </List>
                    </Collapse>
                    </div>
                </div>

                <div className = "Details_Page_Radio_Buttons_Column">
                    <div className = "Details_Page_Radio_Buttons_Column_Heading">
                    <div className = "Details_Page_SubHeading">
                        Email
                    </div>
                    <div className = "Details_Page_Radio_Button">
                    <Radio
                        checked={this.state.email}
                        onClick={this.handleEmailChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                        size = "small"
                    />
                    </div>
                    </div>
                    <div className = "Details_Page_Input_Fields">
                    <Collapse in={this.state.email} timeout="auto" unmountOnExit className = "Details_Page_Collapse">
                    <FormControlLabel 
                    checked={!this.state.emailnew} 
                    onClick = {() => {
                        this.handleNewEmail(false)
                    }} 
                    control={<Radio color="primary" size = "small" />} 
                    label="Existing" />
                    <FormControlLabel
                     checked={this.state.emailnew} 
                     onClick = {() => {
                        this.handleNewEmail(true)
                    }} 
                     control={<Radio color="primary" size="small" />} 
                     label="New" />
                     <List component="div" disablePadding className = "Details_Page_List">
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label="New Email" name = "newEmail" value = {this.state.newEmail} onChange = {this.handleChange}/>
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Old Email" name = "oldEmail" value = {this.state.oldEmail} onChange = {this.handleChange}/>
                    </ListItem>
                    </List>
                    </Collapse>
                    </div>
                </div>
                <div className = "Details_Page_Radio_Buttons_Column">
                    <div className = "Details_Page_Radio_Buttons_Column_Heading">
                    <div className = "Details_Page_SubHeading">
                        Plans
                    </div>
                    <div className = "Details_Page_Radio_Button">
                    <Radio
                        checked={this.state.plan}
                        onClick={this.handlePlanChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                        size = "small"
                    />
                    </div>
                    </div>
                    <div className = "Details_Page_Input_Fields">
                    <Collapse in={this.state.plan} timeout="auto" unmountOnExit className = "Details_Page_Collapse">
                     <List component="div" disablePadding className = "Details_Page_List">
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label="Emergency Fund" name = "emergency" value = {this.state.emergency} onChange = {this.handleChange}/>
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Retirement Age" name = "ret_age" value = {this.state.ret_age} onChange = {this.handleChange}/>
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Number of Kids" name = "no_of_kids" value = {this.state.no_of_kids} onChange = {this.handleChange}/>
                    </ListItem>
                    <ListItem className = "Details_Page_List_Item">
                    <TextField className = "space" id="standard-basic" label= "Plan ID" name = "plan_id" value = {this.state.plan_id} onChange = {this.handleChange}/>
                    </ListItem>
                    </List>
                    </Collapse>
                    </div>
                </div>           
                </div>
                <div className = "Details_Page_Submit">
                <Button 
                color="secondary"
                onClick = {this.handleSubmit}>
                Submit
                </Button>
                </div>
            </div>
            </div>
        )
    }
// }
}

export default Details;
