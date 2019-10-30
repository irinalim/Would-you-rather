import React from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from '../utils/helpers'

class ResultCard extends React.Component {


    render() {
        const {question} = this.props

        if (question === null) {
            return <p>This question doesn't exist</p>
        }
        const {answer} = this.props
        if (answer === null) {
            return <p>You haven't answered this question</p>
        }
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOneShare = totalVotes === 0 ? 0 : optionOneVotes * 100 / totalVotes
        const optionTwoShare = totalVotes === 0 ? 0 : optionTwoVotes * 100 / totalVotes

        const {id, timestamp, author, avatar, optionOne, optionTwo} = question
        //
        console.log("Votes:", {question, optionOneVotes, optionTwoVotes, totalVotes})

        return (
            <div className='container'>
                <div className='card column is-half is-offset-one-quarter'>
                    <div className='card-header'>
                        <p className='card-header-title'>{author} asks:</p>
                    </div>
                    <div className='card-content columns'>
                        <div className='media column is-3'>
                            <figure className='image is-128x128'>
                                <img src={avatar} alt=""/>
                            </figure>
                        </div>
                        <div className='content column is-7 is-offset-1'>
                            <h3>Results:</h3>
                            <div>
                                <div className='card'>
                                    <div className='content'>
                                        <p>Would you rather {question.optionOne.text}</p>
                                        <progress className="progress is-primary" value={optionOneShare}
                                                  max="100">{optionOneShare}</progress>
                                        {
                                            question.optionOne.votes.includes(this.props.authedUser) ?
                                                <p>Your choice</p> : null
                                        }
                                        <p>{optionOneVotes} out of {totalVotes} votes</p>
                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='content'>
                                        <p>Would you rather {question.optionTwo.text}</p>
                                        <progress className="progress is-primary" value={optionTwoShare}
                                                  max="100">{optionTwoShare}</progress>
                                        {
                                            question.optionTwo.votes.includes(this.props.authedUser) ?
                                                <p>Your choice</p> : null
                                        }
                                        <p>{optionTwoVotes} out of {totalVotes} votes</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
    const question = questions[id]
    const answer = authedUser ? users[authedUser]["answers"][id] : null
    console.log("Result Card", answer)


    return {
        authedUser: authedUser,
        answer: answer,
        question: question ? formatQuestion(question, users[question.author]) : null,
    }
}

export default connect(mapStateToProps)(ResultCard)