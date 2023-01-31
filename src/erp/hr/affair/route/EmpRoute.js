import React from 'react';
import { Route, withRouter } from 'react-router-dom';
// 인 사 관 리 =========================================================================================================================
import { default as EmpDetailedContainer } from '../page/EmpDetailed/SimpleEmpSearch/EmpDetailedContainer'; // 사원상세조회          //유주
import { default as EmpRegist } from '../page/EmpRegist/EmpRegist'; //사원등록     //성훈
import { default as EmploymentManage } from '../page/EmploymentManage/EmploymentManageContainer'; //2020-11-19 64rl동욱 재직증명서관리
import { default as EmploymentAssign } from '../page/EmpAssign/EmpAssignContainer';
import { default as EmpEvalContainer} from '../page/EmpEval/EmpEvalContainer';
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";
import EmpInfoContainer from "../page/EmpDetailed1/EmpInfoContainer";

const EmpRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        //근태관리 TAB
        // 일근태 등록
        {
            path: '/app/hr/affair/empEval',
            element: <EmpEvalContainer />
        },
        {
            path: '/app/hr/affair/empinfo',
            element: <EmpInfoContainer />
        }
 ]
};

export default EmpRoute;
