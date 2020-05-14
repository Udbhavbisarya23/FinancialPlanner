import React from 'react';
import {Link} from 'react-router-dom';
import SignupJ from './SignUpsupp';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Multistep from 'react-multistep';
import StepThree from './StepThree';
import StepFour from './StepFour';
import 'tachyons';

const SignUp = () => {
  
  const steps = [
    {name: 'StepOne', component: <StepOne/>},
    {name: 'StepTwo', component: <StepTwo/>},
    {name: 'StepThree', component: <StepThree/>},
    {name: 'StepFour', component: <StepFour/>}
  ];
    return(
    <div className = 'tc'>
          
        <h1 className = "grow light-green" >Sign Up</h1>  
        {/* <div className = "tc">
            <SignupJ />
        </div>           */}
        <div >
        <Multistep  showNavigation={true} steps={steps}/>
        </div>
        <Link to = '/Login'>
          <div className = "underline bg-animate bg-near-blue hover-bg-green inline-flex items-center tc pa2">  
          <span style = {{color:'#ccffff'}}class="f6 ml3 pr2 pv2 ma3">Already a Member?Login Now!</span>
          </div>  
        </Link>
        <Link to = '/'>
          <div className = "no-underline bg-animate bg-near-blue hover-bg-green inline-flex items-center tc pa2">  
          <span style = {{color:'#ccffff'}}class="f6 ml3 pr2 pv2 ma3">Back Home</span>
          </div>                    
        </Link>
         
       
    </div>
    )
}

export default SignUp;