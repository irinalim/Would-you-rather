import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Link, withRouter} from "react-router-dom/";


class Nav extends React.Component {
    handleLogout = (e) => {
        e.preventDefault()
        this.props.history.push('/')
    }

    render() {
        if (!this.props.authedUser) {
            return null
        }
        // console.log("Nav props", this.props)
        const user = this.props.users[this.props.authedUser]
        return (
            <nav className='tabs is-boxed'>
                <ul>
                    <li>
                        <NavLink to='/home' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                </ul>
                <h3>Hello, {user.name}</h3>
                <div className='media'>
                    <figure className='image is-48x48'>
                        <img src={user.avatarURL} alt=""/>
                    </figure>
                </div>
                <div>
                    <button className='button' onClick={(e) => this.handleLogout(e)}>
                        Logout
                    </button>
                </div>

            </nav>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    // console.log("mapsttopr", authedUser, "users", users)
    return {
        authedUser: authedUser,
        users: users,
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
