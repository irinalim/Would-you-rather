import React from 'react'
import {connect} from 'react-redux'
import LeaderCard from "./LeaderCard";

class Leaderboard extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Leaderboard</h1>
                <div>
                    {this.props.usersSorted.map((user) => (
                        <div>
                            <LeaderCard user={user}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({users}) {
    const newUsers = Object.keys(users).map(k => users[k])
    newUsers.map((newUser) => {
        newUser.score = Object.keys(newUser.answers).length + newUser.questions.length
    })
    const usersSorted = newUsers.sort((a,b) => b.score - a.score)
    return {
        users: users,
        usersSorted: usersSorted,
    }
}

export default connect(mapStateToProps)(Leaderboard)