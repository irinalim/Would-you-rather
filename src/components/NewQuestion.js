import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {handleCreateQuestion} from "../actions/shared";
import Nav from "./Nav";

class NewQuestion extends React.Component {
    componentDidMount() {
        if (!this.props.authedUser) {
            return this.props.history.push('/')
        }
    }

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChangeOne = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
        }))
    }

    handleChangeTwo = (e) => {
        const optionTwo = e.target.value

        this.setState(() => ({
            optionTwo
        }))
    }

    // One for two
    // handleChange = (name, e) => {
    //     const option = e.target.value
    //     this.setState({
    //         [name]: option
    //     })
    // }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        this.props.dispatch(handleCreateQuestion(optionOne, optionTwo))
        this.props.history.push('/home')

    }
    render() {
        const {optionOne, optionTwo} = this.state

        return (<div>
            <Nav/>
            <h1>New Question</h1>
            <form className='' onSubmit={this.handleSubmit}>
                <textarea
                    placeholder="Option One"
                    value={optionOne}
                    onChange={this.handleChangeOne}
                    className='textarea'
                />
                <textarea
                    placeholder="Option Two"
                    value={optionTwo}
                    onChange={this.handleChangeTwo}
                    className='textarea'
                />
                <button
                    className='btn'
                    type='submit'
                    disabled={!optionOne || !optionTwo}>
                    Submit
                </button>
            </form>
        </div>)
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser,
    }
}


export default connect(mapStateToProps)(withRouter(NewQuestion))