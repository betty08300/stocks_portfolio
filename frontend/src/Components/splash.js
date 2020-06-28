import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (props) => {

    const demoSignin = async() => {
        
        const user = { email: 'betty@gmail.com', password: '123456' }
        console.log(user)
        const resp = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
        if (resp.status === 200) {
            props.history.push('/dashboard/portfolio');
        } else {
            console.log('invalid email or password'); 
        }
        
    }

    return (
        <div className="container d-flex justify-content-center align-items-center fullViewHeight" >
            <div className="btn-group-vertical splash-box">
                <Link to='/signup' className='btn btn-outline-dark clickBtn' style={{margin:'30px 0'}}>Register</Link>
                <Link to='/login' className='btn btn-outline-dark clickBtn'>Login</Link>
                <div className='btn btn-outline-dark clickBtn' onClick={demoSignin} style={{marginTop:"17px"}}>Demo Login</div>
            </div>
        </div>
    )
}

export default Splash; 