import React from 'react';
import Box from './Signupbox'


const SignUpJ = () =>{
    return(
         <div className = 'tc'>
            <Box name = 'Username' type = 'text' id = 'username' placeholder = 'abc'/>
             <Box name = 'Password' type = 'password' id = 'password' placeholder = 'abc'/>   
             <Box name = 'Email' type = 'email' id = 'email' placeholder = 'abc@xyz.com'/>
             <Box name = 'Phone Number' type = 'tel' id = 'phone-no' placeholder = '1111111111'/>      
        </div>
        
    )
}


export default SignUpJ;
