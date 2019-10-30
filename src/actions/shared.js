import {getInitialData, saveQuestion} from "../utils/api";
import {receiveQuestions, addAnswerToQuestion, saveQuestionToQuestions} from "./questions";
import {receiveUsers, addAnswerToUser, saveQuestionToUser} from "./users";
import {setAuthedUser} from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading'


// export function handleInitialData() {
//     return (dispatch) => {
//         return getInitialData()
//             .then(({users, questions}) => {
//                 dispatch(receiveUsers(users))
//                 dispatch(receiveQuestions(questions))
//             })
//     }
// }

export function handleAnswerQuestion(cid, authedUser, answer) {
    return (dispatch) => {
        dispatch(addAnswerToUser(cid, authedUser, answer))
        dispatch(addAnswerToQuestion(cid, authedUser, answer))
    }
}

export function handleCreateQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({optionOne, optionTwo, author: authedUser})
            .then((question) => dispatch(saveQuestionToQuestions(question)))
            .then((data) => {
                dispatch(saveQuestionToUser(data.question))
            }).then(() => dispatch(hideLoading()))
    }
}