import {useEffect, useState} from 'react';
import Axios from "axios";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {FormControl, Grid} from "@mui/material";
import MySelect from "../../../util/MySelect";
import MyGrid from "../../../util/MyGrid";
import columnDefinition from "./columnDefinition";

const EmpInfoContainer = () => {
    const [selectDeptData, setSelectDeptData] = useState(
        {
            dept: [
                { key: '부서선택해주세요', value: 'ALL' }
            ]
        }
    );

    const [selectEmpData, setSelectEmpData] = useState(
        {
            emp: [
                { key: '사원선택해주세요', value: 'ALL' },
            ]
        }
    );

    const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value);

    const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value);

    const [rowData, setRowData] = useState("");

    useEffect(() => {
        Axios.get(
            "http://localhost:9101/foudinfomgmt/deptlist"
        ).then(({ data }) => {
            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })
            setSelectDeptData({
                // dept: dataList
                ...selectDeptData, dept: [...selectDeptData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);

    const selectHandleChange = e => {
        const selectValue = e.target.value;
        setSelectDeptTitle(selectValue);

        // 사원명
        Axios.get(
            "http://localhost:9101/empinfomgmt/emplist",
            {
                params: {
                    value: selectValue
                }
            }
        ).then(response => {
            const empList = response.data.list.map(e => {
                return {
                    key: e.empName,
                    value: e.empCode
                }
            })

            setSelectEmpData({
                emp: empList
            })

        }).catch(() => {
            alert('해당부서에는 사원이 존재하지 않습니다');
            window.location.reload(true);
        })
    };

    const selectSearchEmpChange = (e) => {
        const selectName = e.target.value;
        setSelectEmpCode(selectName);

        // 사원명 변경시 퇴직금 찍는
        Axios.get(
            "http://localhost:9101/salaryinfomgmt/awards",
            {
                params: {
                    empName: selectName
                }
            }
        ).then(
            response => {
                setRowData(response.data.List);
            }
        )
    };

    return (
        <>
            <MainCard
                content={false}
                title="사원 조회"
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <FormControl style={{ minWidth: "250px" }}>
                        <MySelect
                            selectName={'부서'}
                            selectValue={selectDeptTitle}
                            selectonChange={selectHandleChange}
                            menuItemMap={selectDeptData.dept} />
                    </FormControl>
                    <FormControl style={{ minWidth: "250px" }}>
                        <MySelect
                            selectName={'사원명'}
                            selectValue={selectEmpCode}
                            selectonChange={selectSearchEmpChange}
                            menuItemMap={selectEmpData.emp}
                        />
                    </FormControl>
                </Grid>
                }
            >

            </MainCard>
            <MyGrid
                columnDefinition={columnDefinition}
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true}
                columnDefinitionion={columnDefinition} style={{
                height: "100%",
                width: "100%",
            }}
            />
        </>
    )
};
export default EmpInfoContainer;