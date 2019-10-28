import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {handleCreateQuestion} from "../actions/shared";

class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
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

    handleChange = (name, e) => {
        const option = e.target.value
        this.setState({
            [name]: option
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        this.props.dispatch(handleCreateQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionTwo: '',
            optionOne: '',
            toHome: true,
        }))
    }
    render() {
        const {optionOne, optionTwo, toHome} = this.state

        if (toHome === true) {
            return <Redirect to='/'/>
        }
        return (<div>
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


export default connect()(NewQuestion)