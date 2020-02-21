import React from 'react';
import SignupForm from './Components/signupForm';
import LoginForm from './Components/loginForm';
import Transaction from './Components/transaction';
import Splash from './Components/splash';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Portfolio from './Components/portfolio';
import './index.scss'; 

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
            <Route path='/dashboard/portfolio' component={Portfolio}/>
            <Route path='/dashboard/transaction' component={Transaction}/>
            <Route path='/' component={Splash}/>


          </Switch>
    
        </BrowserRouter>
      </div>
    )
  }
}



export default App;
