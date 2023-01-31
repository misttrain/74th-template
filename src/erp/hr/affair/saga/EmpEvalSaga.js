import { takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';


//==========인사고과 수정=============
export const UPDATE_EMP_EVAL_START = 'empeval/UPDATE_EMP_EVAL_START';

export const updateEmpEvalStart= createAction(UPDATE_EMP_EVAL_START);

const UpdateEmpEvalSaga = createRequestSaga(UPDATE_EMP_EVAL_START, api.empEvalUpdate);

export default function* EmpEval() {
    yield takeLatest(UPDATE_EMP_EVAL_START, UpdateEmpEvalSaga);
}