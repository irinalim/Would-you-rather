import {getUsers} from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ANSWER_USER = 'ANSWER_USER'


export const receiveUsers = () => {
    return async (dispatch) => {
        dispatch(showLoading())
        const users = await getUsers();
        dispatch({
            type: RECEIVE_USERS,
            users,
        })
        dispatch(hideLoading())
    }
}

export function addAnswerToUser (qid, authedUser, answer) {
    return {
        type: ANSWER_USER,
        qid,
        authedUser,
        answer,
    }
}
