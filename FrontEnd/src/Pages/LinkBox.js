import React from 'react';

const LinkBox = (props) => {
    return(
        <div className = "tc bg-light-green dib br3 pa3 ma2 grow shadow-5  bw2">
            {props.name}
        </div>
    )
}
export default LinkBox;