export const UPDATE_EMP_EVAL_SUCCESS = 'empeval/UPDATE_EMP_EVAL_START_SUCCESS';
export const UPDATE_EMP_EVAL_FAILURE = 'empeval/UPDATE_EMP_EVAL_START_FAILURE';

const initialState = {
    empEvalList: [],
    errorMsg: '',
    errorCode: '',
};

const empEval = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMP_EVAL_SUCCESS :
            return {
                ...state,
                empEvalList: []
            };
        default:
            return state;
    }

}
export default empEval; //나중에 empEval로 변경하기