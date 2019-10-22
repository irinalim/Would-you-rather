import React, {Component} from 'react'
import {connect} from 'react-redux'
import {receiveQuestions} from "../actions/questions";
import {setAuthedUser} from "../actions/authedUser";
import LoadingBarContainer from "react-redux-loading";
import QuestionCard from "./QuestionCard";
import Nav from "./Nav";

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(receiveQuestions())
        if (this.props.authedUser === null || this.props.users === null || this.props.questions === null)
            this.props.history.push('/')
    }
    render() {
        return (
            <div className='container'>
                <Nav/>
                <LoadingBarContainer/>
                <h3 className='title center'>Questions</h3>
                {this.props.loading === true
                    ? null
                    : <ul>
                        {this.props.questionIds.map((id) => (
                            <li key={id}>
                                <QuestionCard id={id}/>
                                <br/>
                            </li>
                        ))}
                    </ul>}
                {/*<div>*/}
                {/*    {this.props.questions}*/}
                {/*</div>*/}

            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    console.log("Home state", questions)
    return {
        authedUser: authedUser,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Home)