import React from 'react';


const Scroll = (props) =>{
    return(
        <div style = {{overflowY: 'auto',height: '700px',border:'1px solid black'}}>
            {props.children}
        </div>
    )
}
export default Scroll;