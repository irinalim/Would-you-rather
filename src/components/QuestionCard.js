import React from 'react'
import {connect} from 'react-redux'
import {formatQuestion, formatDate} from '../utils/helpers'
import {handleAnswerQuestion} from "../actions/shared";
import { withRouter } from "react-router-dom";


class QuestionCard extends React.Component {

    handleChange(value) {
        this.setState({
            answer: value
        });
        console.log(this.state)
    }

    handleSubmit = (e) =>  {
        e.preventDefault()
        const {answer} = this.state
        this.props.dispatch(handleAnswerQuestion( this.props.id, this.props.authedUser, answer ))
        if (answer) {
            this.props.history.push(`/question/${this.props.id}`)
        }
    }

    render() {
        const {question} = this.props
        if (question === null) {
            return <p>This question doesn't exist</p>
        }

        const {id, timestamp, author, avatar, optionOne, optionTwo} = question

        // console.log(this.props)

        return (
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
                        <h3>Would you rather</h3>
                        <div className='content'>
                            <form className='control' onSubmit={this.handleSubmit}>
                                <label className='radio'>
                                    <input type="radio" name={id} value="optionOne" onClick={(e) => this.handleChange(e.target.value)}/>
                                    {optionOne.text}
                                </label>
                                <br/>
                                <label className='radio'>
                                    <input type="radio" name={id} value="optionTwo" onClick={(e) => this.handleChange(e.target.value)}/>
                                    {optionTwo.text}
                                </label>
                                <div>
                                    <button className="button is-primary is-centered" type="submit" >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*<p>{id}</p>*/}
                {/*<p>{formatDate(timestamp)}</p>*/}

            </div>

        )
    }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
    // console.log("Card", users)
    const question = questions[id]
    return {
        authedUser: authedUser,
        question: question ? formatQuestion(question, users[question.author]) : null
    }
}

export default connect(mapStateToProps)(withRouter(QuestionCard))