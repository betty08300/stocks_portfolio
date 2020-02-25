import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (props) => {

    return (
        <div className="container d-flex justify-content-center align-items-center fullViewHeight" >
            <div className="btn-group-vertical splash-box">
                <Link to='/signup' className='btn btn-outline-dark clickBtn' style={{margin:'30px 0'}}>Register</Link>
                <Link to='/login' className='btn btn-outline-dark clickBtn'>Login</Link>
            </div>
        </div>
    )
}

export default Splash; 