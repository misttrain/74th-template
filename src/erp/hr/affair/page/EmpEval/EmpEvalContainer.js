import React, { useState } from "react";
import { connect } from "react-redux";
import {updateEmpEvalStart} from "../../saga/EmpEvalSaga";
import EmpEval from "./EmpEval"
import empEval from "../../reducer/EmpEvalReducer";



const EmpEvalContainer= ({
                             empEvalList,
                             updateEmpEvalStart
                         }) => {

    const handleUpdateEmpEval=(
        empCode,
        numberOfCertificate,
        durationOfTraining
    )=>{

        updateEmpEvalStart({
            empCode : empCode,
            numberOfCertificate : numberOfCertificate,
            durationOfTraining : durationOfTraining
        })
    }


    return (
        <div>
            <br></br>
            <EmpEval
                handleUpdateEmpEval={handleUpdateEmpEval}
                empEvalList={empEvalList}
            />
        </div>
    );
};

// 리덕스의 state
const mapStateToProps = state => {
    return {
        empEvalList: state.RootReducers.hr.affair.empEval.empEvalList,
//리듀서 수정
    };
};

// 여기가 action과 store연결
export default connect(mapStateToProps, {
    updateEmpEvalStart,
})(EmpEvalContainer);