import React from 'react';
import './Sidebar.css'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {List,ListItem,ListItemIcon,ListItemText,Divider} from '@material-ui/core';
import {Home,Dashboard,Details,AttachMoney} from '@material-ui/icons'
import {Link} from 'react-router-dom';

const theme = createMuiTheme({
    overrides:{
        MuiListItemIcon: {
            root:{
                color: "white"
            }
        },
        MuiButtonBase: {
            root:{
            color:"white"
            }
        },
        MuiListItem:{
            button:{
                "&:focus":{
                    "background-color":"rgba(131, 133, 201,0.4)"
                },
                "&:hover":{
                    "background-color":"rgba(135, 129, 197,0.4)"
                }
            }
        }
    }
})
class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            'index':0
        }
    }
    selectedfunc = (event,num) => {
        this.setState({index: num})
    }
    render(){
        return(
            <MuiThemeProvider theme = {theme}>
            <div className = "sidebarBG">
            <nav className = "sidebarnav">
            <ListItem 
            button 
            selected = {this.state.index === 0 } 
            className = "sidebar_header"
            onClick = {(event) => {this.selectedfunc(event,0)}} >
                <ListItemIcon>
                    <AttachMoney />
                </ListItemIcon>
                <ListItemText primary = "FPlanner" />
            </ListItem>
            <Divider />
            <List>
            <ListItem 
            className = "sidebar_listitem" button>
                <ListItemIcon className = "sidebar_listitem_icon">
                    <Home />
                </ListItemIcon>
                <ListItemText primary = "Home" className = "sidebar_listitem_text"/>
            </ListItem>
            <Link to = "/Dashboard" className = "sidebar_Link_Button">
            <ListItem className = "sidebar_listitem" button>
                <ListItemIcon className = "sidebar_listitem_icon">
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary = "Dashboard" className = "sidebar_listitem_text"/>
            </ListItem>
            </Link>
            <Link to = "/Details" className = "sidebar_Link_Button">
            <ListItem className = "sidebar_listitem" button>
                <ListItemIcon className = "sidebar_listitem_icon">
                    <Details />
                </ListItemIcon>
                <ListItemText primary = "Details" className = "sidebar_listitem_text"/>
            </ListItem>
            </Link>
            </List>
            </nav>              
            </div>
            </MuiThemeProvider>
        )
    }
}

export default Sidebar;