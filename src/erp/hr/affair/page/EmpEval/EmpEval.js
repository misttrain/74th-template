import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";

import axios from "axios";

import useInput from "util/useInput";
import moment from "moment";


// material-ui
import { useTheme } from '@mui/material/styles';
import {Button, CardActions,CardContent,Divider,Grid,Tab,Tabs,Typography} from '@mui/material';

// project imports

import MainCard from 'template/ui-component/cards/MainCard';
import {gridSpacing} from 'template/store/constant';
import sessionStorage from "redux-persist/es/storage/session";
import EmpEvalProfile from "./EmpEvalProfile";


const EmpEval= props => {

    const theme = useTheme();

    //사원코드 임시등록
    sessionStorage.setItem("empCodeInfo_token","A490073");
    sessionStorage.setItem("empNameInfo_token","락창카이");

    const empCode =sessionStorage.getItem("empCodeInfo_token");
    const empName =sessionStorage.getItem("empNameInfo_token");

    console.log("사원코드 : " + empCode);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="인사고과" content={false}>
                    <Grid container spacing={gridSpacing}>

                        <Grid item xs={12} lg={12}>
                            <CardContent
                                sx={{
                                    borderLeft: '1px solid',
                                    borderColor: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.grey[200],
                                    height: '100%',
                                }}
                            >
                                {/* 유저프로필에 props 전달 */}
                                <EmpEvalProfile  empCode={empCode} empName={empName}  handleUpdateEmpEval={props.handleUpdateEmpEval} />

                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <CardActions>

                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};
export default EmpEval;
