import React, { Fragment } from 'react';

const SearchBox = ({searchfield,searchChange}) =>{
    return(
        <div>
            <input 
                className = "pa2 ba b--green bg-lightest-blue ma3"
                type = 'search' 
                placeholder = 'Search robots' 
                onChange = {searchChange}    
                />
            <input
                type = 'submit'
                className = 'f6 link dim ph3 pv2 mb2 dib white bg-green' 
            />   
        </div>
        
        
    );
}
export default SearchBox;