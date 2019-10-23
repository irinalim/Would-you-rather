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
        console.log("Nav props", this.props)
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
                <h3>Hello, {this.props.name}</h3>
                <div className='media'>
                    <figure className='image is-48x48'>
                        <img src={this.props.avatar} alt=""/>
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
    console.log("mapsttopr", authedUser, "users", users)
    return {
        authedUser: authedUser,
        // users: users,
        avatar: users[authedUser].avatarURL,
        name: users[authedUser].name
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
