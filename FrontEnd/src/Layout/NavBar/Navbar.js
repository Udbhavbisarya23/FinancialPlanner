import React from 'react';
import './Navbar.css'
import Logo from '../../assets/img/Logo_1.png';
import Button from '@material-ui/core/Button';
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core';
import {Settings} from '@material-ui/icons';
import {Link} from 'react-router-dom';


class NavBar extends React.Component{
    render(){
        return(
            <div className = "navbar">
            <div className = "navbar_Logo">
                <img src = {Logo} height = "70"/>
            </div>
            <div className = "spacer" />
            <div className = "navbar_links">
                <List className = "navbar_list">
                    <ListItem button>
                        <ListItemText primary = "About Us" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </div>
            <div className = "navbar_login">
                <Link to  = '/Login'>            
                <Button variant = "outlined" color = "secondary">
                    Log In
                </Button> 
                </Link>
            </div>
            </div>
        )
    }
}

export default NavBar;