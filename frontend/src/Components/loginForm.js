import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
   
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const inputObj = {
        'email': changeEmail,
        'password': changePassword
    }

    const handleSubmit = async(e) => {
        const user = { email, password }
        console.log(user)
        e.preventDefault();
        const resp = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
        console.log(await resp.json()); 
        
    }

    const update = (field) => {
        return e => inputObj[field](e.target.value);
    }

    

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="border border-dark container d-flex flex-column justify-content-between align-items-center" style={{width: '400px', minWidth: '300px'}}>
                <h3>Login</h3>
                <form className="container d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                
                    <label>Email</label>
                    <input type='text' value={email} onChange={update('email')}/>
                    
                    <label>Password</label>
                    <input type='text' value={password} onChange={update('password')}/>
                    
                    <button>Login</button>
                </form>
                <Link to='/signup'>Don't have an account?</Link>
            </div>
        </div>
    )
}

export default LoginForm; 