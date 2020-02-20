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
        const resp = await fetch('http://localhost:3001/user/signup', {
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
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <label>Name</label>
                    <input type='text' value={name} onChange={update('name')}/>
            
                <label>Email</label>
                    <input type='text' value={email} onChange={update('email')}/>
                
                <label>password</label>
                    <input type='text' value={password} onChange={update('password')}/>

                <button>Sign Up</button>
            </form>
            <Link to='/login'>Login</Link>

        </div>
    )
}

export default SignupForm; 