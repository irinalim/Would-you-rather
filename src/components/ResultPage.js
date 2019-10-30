import React from 'react'
import Nav from "./Nav";
import ResultCard from "./ResultCard";
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class ResultPage extends React.Component {
    render() {
        if (!this.props.authedUser) {
            return <Redirect to={'/'}/>
        }
        return (
            <div>
            <Nav/>
            <ResultCard id={this.props.match.params.id}/>
        </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser,
    }
}

export default connect(mapStateToProps)(ResultPage)