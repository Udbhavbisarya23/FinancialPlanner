import React, { Fragment } from 'react';
import LinkBox from './LinkBox';
import {Link} from 'react-router-dom';

const Home = () =>{
    return(
        
        <div className = "tc">
       <div>
        <Link to = '/Login'>
            <LinkBox name = 'Login'/>
        </Link>
       </div> 
       <div>
        <Link to = '/Sign-Up' >
            <LinkBox name = 'Sign Up'/>
        </Link>
       </div>
        
        </div>
        
    )
}

export default Home;