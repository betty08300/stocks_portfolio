import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (props) => {

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="btn-group-vertical" style={{width: '300px', minWidth: '200px'}}>
                <Link to='/signup' className='btn btn-outline-dark' style={{margin:'30px 0'}}>Register</Link>
                <Link to='/login' className='btn btn-outline-dark'>Login</Link>
            </div>
        </div>
    )
}

export default Splash; 