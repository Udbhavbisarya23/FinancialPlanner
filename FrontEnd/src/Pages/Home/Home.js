import React, { Fragment } from 'react';
import LinkBox from '../LinkBox';
import {Link} from 'react-router-dom';
import './Home.css'
import Navbar from '../../Layout/NavBar/Navbar'
import Image from '../../assets/img/CardBg.png'
import {Card,CardActions,CardMedia,CardContent,Button,Typography,createMuiTheme,MuiThemeProvider} from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiTypography: {
            h5:{
                "font-size":"1.25rem",
                letterSpacing: "0.03em"
            }
        }
    }
})
const Home = () =>{
    return( 
        <div className = "Bg">  
        <MuiThemeProvider theme ={theme}>
        <Navbar />   
       {/* <div className = "LoginRedirect" >

        <Link to = '/Login'>
            <LinkBox name = 'Login'/>
        </Link>
       </div> 
       <div>
        <Link to = '/Sign-Up' >
            <LinkBox name = 'Sign Up'/>
        </Link>
       </div>         */}
       <Card className = "Main_Card">
           <CardMedia
               image = {Image}
               className = "Main_card_img"
           />
           <CardContent className = "Card_Content">
                <Typography variant="h5" component = "h2">
                    Planning your financial needs could not be any easier. Sign Up Now and with just a few details have your finances and retirement cash planned out 
                </Typography>
           </CardContent>
           <CardActions className = "SignUp_Button">
                <Link to = '/Sign-Up'>
               <Button size = "big" color = "secondary">Sign Up</Button>
               </Link>
           </CardActions>
       </Card>
       </MuiThemeProvider>      
        </div> 
        
    )
}

export default Home;