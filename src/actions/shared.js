import {getInitialData} from "../utils/api";
import {receiveQuestions, addAnswerToQuestion} from "./questions";
import {receiveUsers, addAnswerToUser} from "./users";
import {setAuthedUser} from "./authedUser";

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