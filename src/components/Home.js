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
        // if (this.props.authedUser === null || this.props.users === null || this.props.questions === null)
        //     this.props.history.push('/')
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
        const answeredQuestions = Object.values(this.props.questionIds).filter((question) => {
            Object.keys(users[this.props.authedUser].answers).includes(question.id)
        })
        const unAnsweredQuestions = Object.values(this.props.questionIds).filter((question) =>
            !Object.keys(users[this.props.authedUser].answers).includes(question.id)
        )
        console.log('show questions', answeredQuestions, unAnsweredQuestions)


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

export default connect(mapStateToProps)(Home)