import {getQuestions} from "../utils/api";
import {saveQuestionAnswer} from "../utils/api";
import authedUser from "../reducers/authedUser";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export const receiveQuestions = () => {
    return async (dispatch) => {
        const questions = await getQuestions();
        dispatch({
            type: RECEIVE_QUESTIONS,
            questions,
        })
    }
}

export function addAnswerToQuestion (qid, authedUser, answer) {
    return {
        type: ANSWER_QUESTION,
        qid,
        authedUser,
        answer,
    }
}
