import React from 'react'

class LeaderCard extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className='card column is-half is-offset-one-quarter'>
                <div className='card-header'>
                    <p className='card-header-title'>{this.props.user.name}</p>
                </div>
                <div className='card-content columns'>
                    <div className='media column is-3'>
                        <figure className='image is-128x128'>
                            <img src={this.props.user.avatarURL} alt=""/>
                        </figure>
                    </div>
                    <div className='content column is-5'>
                        <div className='content'>
                            <p>Questions answered</p>
                            <p>{Object.keys(this.props.user.answers).length}</p>
                            <p>Questions answered</p>
                            <p>{this.props.user.questions.length}</p>
                        </div>
                    </div>
                    <div className='content column'>
                        <div className='content'>
                            <h3>Score {this.props.user.score}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeaderCard