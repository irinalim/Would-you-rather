import React, {Component} from 'react'
import {connect} from 'react-redux'
import {receiveQuestions} from "../actions/questions";
import LoadingBarContainer from "react-redux-loading";
import QuestionCard from "./QuestionCard";
import Nav from "./Nav";
import {withRouter} from "react-router-dom";

class Home extends Component {
    componentDidMount() {
        if (!this.props.authedUser) {
            return this.props.history.push('/')
        }
        this.props.dispatch(receiveQuestions())
    }

    state = {
        showAnswered: false
    }

    handleShowAnswered = () => {
        this.setState({
            showAnswered: true
        });
    }
    handleShowUnanswered = () => {
        this.setState({
            showAnswered: false
        });
    }

    render() {
        const users = this.props.users
        const userId = this.props.authedUser
        if (!userId) {
            return <div>Loading...</div>
        }
        const answers = users[userId].answers
        const answeredQuestions = this.props.questionIds.filter((questionId) => {
            // return answers[questionId]
            return answers.hasOwnProperty(questionId)
            // return Object.keys(answers).includes(questionId)
        })
        const unAnsweredQuestions = this.props.questionIds.filter((questionId) => {
           return !answers.hasOwnProperty(questionId)
        })
        console.log('show questions', {answeredQuestions, unAnsweredQuestions, all: this.props.questionIds, users})


        return (
            <div className='container'>
                <Nav/>
                <LoadingBarContainer/>
                <h3 className='title center'>Questions</h3>
                <div className='tabs is-toggle'>
                    <li className={this.state.showAnswered ? 'is-active' : ''} onClick={this.handleShowAnswered}>
                        <a>
                            <span>Answered</span>
                        </a>
                    </li>
                    <li className={this.state.showAnswered ? '' : 'is-active'} onClick={this.handleShowUnanswered}>
                        <a>
                            <span>Unanswered</span>
                        </a>
                    </li>
                </div>

                {

                }
                {this.props.loading === true
                    ? null
                    : <ul>
                        {
                            this.state.showAnswered
                                ? answeredQuestions.map((id) => (
                                    <li key={id}>
                                        <p>Answered Questions</p>
                                        <QuestionCard id={id}/>
                                        <br/>
                                    </li>
                                ))
                                : unAnsweredQuestions.map((id) => (
                                    <li key={id}>
                                        <p>Unanswered Questions</p>
                                        <QuestionCard id={id}/>
                                        <br/>
                                    </li>
                                ))
                        }
                    </ul>}
                {/*<div>*/}
                {/*    {this.props.questions}*/}
                {/*</div>*/}

            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}) {
    return {
        users: users,
        authedUser: authedUser,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(withRouter(Home))