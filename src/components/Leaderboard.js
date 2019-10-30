import React from 'react'
import {connect} from 'react-redux'
import LeaderCard from "./LeaderCard";
import Nav from "./Nav";
import {withRouter} from "react-router-dom";

class Leaderboard extends React.Component {
    componentDidMount() {

    }

    render() {
        if (!this.props.authedUser) {
            this.props.history.push('/')
            return null
        }
        return (
            <div>
                <Nav/>
                <h1>Leaderboard</h1>
                <div>
                    {this.props.usersSorted.map((user) => (
                        <div key={user.id}>
                            <LeaderCard user={user}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    const newUsers = Object.keys(users).map(k => users[k])
    newUsers.map((newUser) => {
        newUser.score = Object.keys(newUser.answers).length + newUser.questions.length
    })
    const usersSorted = newUsers.sort((a,b) => b.score - a.score)
    return {
        users: users,
        usersSorted: usersSorted,
        authedUser: authedUser,
    }
}

export default connect(mapStateToProps)(withRouter(Leaderboard))