import React from 'react';

const Card = (props) =>{
    const {name,email,id,change,} = props;
    return(
        
        <div 
            className = "tc dib br3 pa3 ma2 grow shadow-1  bw2 "
            onClick = {change}>
            <img alt = 'Robot' src = {`https://robohash.org/${id}?size=200x200`} />
            <div>
                <p>{name}</p>
                <p>{email}</p>
            </div>
        </div>
        
    )
}

export default Card;