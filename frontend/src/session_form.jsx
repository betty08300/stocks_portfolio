import React from 'react';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email:'',
            password: '',
            isSignUp: true
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    update = (field) => {
        return e => this.setState({[field]: e.target.value})
    }





    // renderErrors(){
    //     return(
    //         <ul>
               
    //         </ul>
    //     )
    // }



    render(){
        const { name, email, password, isSignUp } = this.state;
        const formTitle = isSignUp ? 'Login' : 'Register';
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>{formTitle}</h3>
                    <label>Name
                    {!isSignUp &&
                      
                        <input type='text' value={name} onChange={this.update('name')}/>
                    }
                    </label>
                   
                    <label>Email</label>
                        <input type='text' value={email} onChange={this.update('email')}/>
                    

                    <label>password</label>
                        <input type='text' value={password} onChange={this.update('password')}/>
                    

                </form>

            </div>
        )
    }


}

export default SessionForm; 