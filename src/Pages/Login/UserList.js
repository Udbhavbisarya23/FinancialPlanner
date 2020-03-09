import React, { Fragment } from 'react';

import Card from './User';

const Cardlist = ({robots,auth}) =>{
    const cardarray = robots.map((user,i) => {
        return(    
          <Card id ={robots[i].id} name = {robots[i].name} email = {robots[i].email} key = {robots[i].id} change = {auth}/>    
    );
    })
    return(
        <Fragment>
            {cardarray}
        </Fragment>
    )
}
export default Cardlist;
