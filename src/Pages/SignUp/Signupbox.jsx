import React from 'react';

const box = (props) => {
    const {name,type,id,placeholder} = props;
    return(
        <form class="form-control bg-light-green mw7 tl pa4 br2-ns ba b--black-10">
        <fieldset class="tc cf bn ma0 pa0">
        <div className="tc measure-narrow ">
        <label for={name} className="tc b db mb2">{name}</label>
        <input class="input-reset ba b--black-20 pa2 mb2 db w-100" type={type} id={id} placeholder = {placeholder} aria-describedby="password-desc" />
        <small id="password-desc" className="f6 lh-copy black-60 db mb2">        
        </small>
        </div>
        </fieldset>
        
        </form>
        
    )
}

export default box;