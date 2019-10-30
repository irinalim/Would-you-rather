import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route} from "react-router-dom/";
import {connect} from 'react-redux'
import {receiveUsers} from "../actions/users";
import Dashboard from "./Home";
import LoadingBarContainer from "react-redux-loading";
import Login from "./Login";
import NewQuestion from "./NewQuestion"
import Leaderboard from "./Leaderboard";
import ResultPage from "./ResultPage";

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveUsers())
    }

    render() {
        // console.log("render", this.props);
        return (
            <Router>
                <div className="App">
                    <LoadingBarContainer/>
                    <section className="section">
                        <div className="container">


                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Login}/>
                                <Route path='/new' component={NewQuestion}/>
                                <Route path='/home' component={Dashboard}/>
                                <Route path='/leaderboard' component={Leaderboard}/>
                                <Route path='/question/:id' component={ResultPage}/>
                            </div>
                        }
                        {/*<Dashboard/>*/}
                        </div>
                    </section>

                </div>
            </Router>
        );
    }


}

function mapStateToProps({users}) {
    return {loading: users && users.size === 0};
}

export default connect(mapStateToProps)(App);
