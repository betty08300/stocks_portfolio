import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {
 
    const [name, changeName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const inputObj = {
        'name': changeName,
        'email': changeEmail,
        'password': changePassword
    }

    const handleSubmit = async(e) => {
        const user = { name, email, password }
        console.log(user)
        e.preventDefault();
        const resp = await fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
        console.log(await resp.json()); 
    }

    const update = (field) => {
        // return event => this.setState({[field]: event.target.value})
        return e => inputObj[field](e.target.value);
    }
    
    
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="border border-dark container d-flex flex-column justify-content-between align-items-center" style={{width: '400px', minWidth: '300px'}}>
                <h3>Register</h3>
                <form className="container d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>

                    <label>Name</label>
                        <input type='text' value={name} onChange={update('name')}/>
                
                    <label>Email</label>
                        <input type='text' value={email} onChange={update('email')}/>
                    
                    <label>password</label>
                        <input type='text' value={password} onChange={update('password')}/>

                    <button style={{margin:'10px'}}>Sign Up</button>
                </form>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default SignupForm; 