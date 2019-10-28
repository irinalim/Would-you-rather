import React from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";

class Login extends React.Component {

    handleUserSelected =(id) => {
        this.props.setAuthedUser(id)
        this.props.history.push('home')
    }

    static defaultProps = {
        users: [],
    }

    render() {
        const users = this.props
        console.log("login props", this.props)
        // form onSubmit
        // 1. select-> onChange->setstate
        // 2. select ref (google for react ref) get value from select as html element
        return(
            <div className='card column is-half is-offset-one-quarter'>
                <div className='card-header'>
                    <p className='card-header-title'>Login</p>
                    <br/>
                </div>
                <div className='card-content'>
                    <h2>Sign In</h2>

                </div>
                <select name="users" onChange={(e) => this.handleUserSelected(e.target.value)}>
                    <option value="" disabled={true} selected={true}>Choose a User</option>
                    {this.props.users.map((user) => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                </select>
                <button type={"submit"}>Submit</button>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {users: Object.keys(users).map(k => users[k])}
}

export default connect(mapStateToProps, {setAuthedUser})(Login)