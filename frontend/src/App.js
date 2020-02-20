import React from 'react';
import SessionForm from './session_form';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount = async() => {
    const response = await fetch('http://localhost:3001/')
    const users = await response.json();
    console.log(users); 
  }

  render(){
    return(
      <div>
        <SessionForm/> 
      </div>
    )
  }
}


export default App;
