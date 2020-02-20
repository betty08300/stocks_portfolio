import React from 'react';
import SignupForm from './signupForm';
import LoginForm from './loginForm';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount = async() => {
    const resp = await fetch('http://localhost:3001/')
    const users = await resp.json();
    console.log(users); 
  }

  render(){
    return(
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/signup' component={SignupForm}/>
            <Route path='/login' component={LoginForm}/>

          </Switch>
    
        </BrowserRouter>
      </div>
    )
  }
}



export default App;
