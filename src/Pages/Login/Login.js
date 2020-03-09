import React, { Component } from 'react';
import CardList from './UserList';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import {Link} from 'react-router-dom';
 
class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '',
            ans: -1
        };
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users  }));
    }
    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value});
        
    }
    authenticate = () => {
        console.log(1)
    }
    render(){
        let filteredarr = this.state.robots.filter(user =>{
            return user.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(this.state.robots.length === 0)
        {
            return(
                <div>
                    <h1 className = "tc">Loading</h1>
                </div>
            )
        }
        else{
        return(
            <div className = 'tc'>
                <h1 className = "tc grow light-green" >Login</h1>           
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <CardList robots = {filteredarr} auth = {this.authenticate}/>
                </Scroll>
                <Link to = '/Sign-Up'>
                  <div className = "underline bg-animate bg-near-blue hover-bg-green inline-flex items-center tc pa2">  
                  <span style = {{color:'#ccffff'}}class="f6 ml3 pr2">Not a Member?Sign Up Here</span>
                  </div>  
                </Link>
                <Link to = '/'>
                  <div className = "no-underline bg-animate bg-near-blue hover-bg-green inline-flex items-center tc pa2">  
                  <span style = {{color:'#ccffff'}}class="f6 ml3 pr2">Back Home</span>
                  </div>                    
                </Link>
                 
               
            </div>
            
        );
        }
    }
    
}
export default App;