// material-ui
import {Grid,Stack, TextField,Typography,Button,Box,InputLabel,MenuItem,FormControl,Select} from '@mui/material';

// project imports
import Avatar from 'template/ui-component/extended/Avatar';
import {gridSpacing} from 'template/store/constant';
import AnimateButton from 'template/ui-component/extended/AnimateButton';

// assets
import Avatar1 from 'assets/images/users/avatar-7.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import {useEffect, useState} from 'react';
import {number} from 'prop-types';
import moment from "moment";
import axios from "axios";

// ==============================|| EXCUSED PROFILE ||============================== //

function EmpEvalProfile(props){
    //------------- 요청에 필요없는 -----------------

    //부서
    const [dept,setDept] = useState('');
    // 직급
    const [grade,setGrade] = useState('');
    //-----------------------------------------
    // 당일 날짜
    let today = moment().format("YYYY-MM-DD");

    // 사원이름
    const [empName,setEmpName] = useState(props.empName);
    // 사원코드
    const [empCode,setEmpCode] = useState(props.empCode);
    // 연차 구분 코드
    const [restTypeCode,setRestTypeCode] = useState('');
    // 연차 구분 이름
    const [restTypeName,setRestTypeName]= useState('');
    // 당일 날짜
    const [requestDate,setRequestDate] = useState(today);
    // 시작일
    const [startDate,setStartDate] = useState('');
    // 종료일
    const [endDate,setEndDate] = useState('');
    // 일수
    const [numberOfDays,setNumberOfDays] = useState(0);
    // 사유
    const [cause,setCause] = useState('');
    // 상태
    const [applovalStatus,setApplovalStatus] = useState('승인대기');
    // 시작 시간
    const [startTime,setStartTime] = useState('');
    // 종료 시간
    const [endTime,setendTime] = useState('');

    const [selectData, setSelectData] = useState([]);


    const insertEXAttd = () => {

        // 유효성 검사
        if (!restTypeName) {
            alert("근태구분을 선택 해주세요.");
            return;
        }
        if (!startDate) {
            alert("시작일을 선택 해주세요.");
            return;
        }
        if (!endDate) {
            alert("종료일을 선택 해주세요.");
            return;
        }
        if (!startTime) {
            alert("시작시간을 선택 해주세요.");
            return;
        }
        if (!endTime) {
            alert("종료시간을 선택 해주세요.");
            return;
        }
        if (!numberOfDays) {
            alert("일수계산을 진행 해주세요.");
            return;
        }
        if (!cause) {
            alert("사유를 작성 해주세요.");
            return;
        }

        console.log("insert 인자값들");
        console.log(empCode,
            restTypeCode,
            restTypeName,
            requestDate,
            startDate,
            endDate,
            numberOfDays,
            cause,
            applovalStatus,
            startTime,
            endTime,);

        props.handleUpdateEmpEval(
            empCode,
            empName,
            restTypeCode,
            restTypeName,
            requestDate,
            startDate,
            endDate,
            numberOfDays,
            cause,
            applovalStatus,
            startTime,
            endTime,
        );

        alert( " 신청이 완료 되었습니다.");
        location.reload();

    };

    //-----------------------------------1차 js------------------------

    /* 일수 계산 함수  */
    function calculateNumberOfDays(){
        var startMs = Number((newDate(startDate)).getTime());
        var endMs = Number((newDate(endDate)).getTime());
        console.log("일수 계산");
        console.log(startMs);
        console.log(endMs);
        setNumberOfDays((endMs-startMs)/(1000*60*60*24)+1);

    }

    /* 시간 선택 함수 */
    useEffect(() => {
        axios.get(
            "http://localhost:9101/empinfomgmt/empreallist"
        ).then(response => {
            console.log("list1111",response.data.list);
            setSelectData(response.data.list)
        })
            .catch(e => {
                console.log("!!!!!!!!!!!!" + e);
            });
    }, []);

    const empList =selectData.map(
        (e)=> {
            return <MenuItem value={e.empCode}>{e.empName}</MenuItem>
        }
    )

    return(
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">

                    <Grid item sm zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
                                </Stack>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">평가대상직원</InputLabel>
                        <Select
                            label="평가대상직원"
                            >
                            {empList}

                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="신청자" placeholder="김솔빈" value={empName}/>
            </Grid>


            <Grid item xs={12} sm={6} >
                < TextField
                    fullWidth label="시작일"
                    name="시작일"
                    type={"date"}
                    onChange={(event)=>{setStartDate(event.target.value)}}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                < TextField
                    fullWidth label="종료일"
                    name="종료일"
                    type={"date"}
                    onChange={(event)=>{setEndDate(event.target.value)}}
                    defaultValue="xxxx-xx-xx"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel >관련자격증개수</InputLabel>
                        <Select

                            label="자격증개수"
                            onChange={(event)=>{
                                setStartTime(event.target.value.replace(":",""));
                            }}
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="예상고과등급" value={numberOfDays}/>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="center">
                <Button variant="contained" size="large" onClick={calculateNumberOfDays}>
                    예상고과등급
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="center">
                <AnimateButton>
                    <Button variant="contained" size="large" onClick={insertEXAttd}>
                        등록
                    </Button>
                </AnimateButton>
            </Grid>
        </Grid>
    )
};

export default EmpEvalProfile;