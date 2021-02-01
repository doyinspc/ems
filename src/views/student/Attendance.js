import { CRow, CCol, CButton, CContainer, CInput, CLabel } from '@coreui/react';
import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { 
    getStudentattendances, 
    getStudentattendancedailys,
    getStudentattendance, 
    registerStudentattendance, 
    registerStudentattendancedaily,
    updateStudentattendance, 
    updateStudentattendancedaily, 
    deleteStudentattendance,
    deleteStudentattendancedaily
  } from './../../actions/student/studentattendance';
  import moment from 'moment'
import AttendanceBox from './../staff/AttendanceBox';
import { leaves } from '../../actions/common';


const Studentattendance = (props) => {
     let dt = new Date();
     
     //let firstday = new Date(dt.getFullYear(), dt.getMonth(), -1);
     //let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
     const [firstday, setfirstday] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), -1))
     const [lastday, setlastday] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
     const [datax, setdatax] = useState({})

    useEffect(() => {
        //date changes get
        let params = {
          data:JSON.stringify(
          {
              'schoolid':props.user.activeschool.id,
              'grp':1,
              'starts':moment(firstday).format('YYYY-MM-DD'),
              'ends':moment(lastday).format('YYYY-MM-DD')
    
          }),
          cat:'selectedattendance',
          table:'attendances',
          narration:'get all students'
      }
        props.getStudentattendances(params)
    
        let params1 = {
          data:JSON.stringify(
          {
              'clients':props.user.activeschool.id,
              'schoolid':props.user.activeschool.id,
              'grp':5,
              'starts':moment(firstday).format('YYYY-MM-DD'),
              'ends':moment(lastday).format('YYYY-MM-DD')
          }),
          cat:'selectedattendance',
          table:'attendances',
          narration:'get all attendance'
      }
        props.getStudentattendancedailys(params1)
      }, [firstday, lastday])
     
     const changeData = (client, ids) =>{
         let datas = {...datax}
         if(datas.hasOwnProperty(client))
         {
             datas[client].push(ids)
             setdatax(datas)
         }else{
             datas[client] =[];
             datas[client].push(ids)
             setdatax(datas)
         }
         
     }

     const getStaged = (myd, cand, cli, issue) =>{
        if(new Date(myd) <= new Date() && new Date(myd).getDay() !== 6 && new Date(myd).getDay() !== 0)
        {
            let list = cand.split(',');
            if(list.includes(cli))
            {
                if(parseInt(issue) > 0)
                {
                    return parseInt(issue);
                }else{
                    return 1;
                }
            }else
            {
                return 0;
            }
        }
     }
     let registered_attendance_date = Array.isArray(props.studentattendance.studentattendancedailys)  && props.studentattendance.studentattendancedailys !== undefined? props.studentattendance.studentattendancedailys : [];
     let arr_days = {}
     registered_attendance_date.forEach(rw =>{
         return arr_days[rw.dates] = rw.reason
     });
      
      let registered_attendance_issue = Array.isArray(props.studentattendance.studentattendances)  && props.studentattendance.studentattendances !== undefined? props.studentattendance.studentattendances : [];
      let arr_persons = {}
      registered_attendance_issue.forEach(rw =>{
            return arr_persons[rw.dates+"_"+rw.clients] = rw.leaveid
      });

     var listDate = [];
     var startDate = firstday ;
     var endDate = lastday;
     var dateMove = new Date(startDate);
     var strDate = startDate;

        while (new Date(strDate) < new Date(endDate)){
                var strDate = dateMove.toISOString().slice(0,10);
                listDate.push(strDate);
                dateMove.setDate(dateMove.getDate()+1);
        };

    
     
    let alldays =  listDate.map((prop, ind)=>{
        return <td key={ind} className="text-center" style={{width:'25px'}}><strong>{moment(new Date(prop)).format('dd')}</strong></td>
    })
     let alldates =  listDate.map((prop, ind)=>{
            return <><td key={ind} className="text-center"><strong>{new Date(prop).getDate()}</strong></td>
                </>
     })
     let allpara = leaves.map((r, i)=>{
        return <td key={i} rowSpan={2}>
                <small style={{textOrientation:'upright'}}>{r.name}</small>
                </td>

            })

     let allstudents =  props.students;
     let studenx =  allstudents.map((prop, ind)=>{
         let dt = []
         return <tr key={ind +"_"+ prop.id}>
             <td className="text-right"><strong className='text-nowrap'>{`${prop.surname} ${prop.firstname} ${prop.middlename}`}</strong></td>
             {listDate.map((pro, ind)=>{
                let date_marked = arr_days[moment(pro).format('YYYY-MM-DD')] ? arr_days[moment(pro).format('YYYY-MM-DD')]: ''
                let date_issue = arr_persons[moment(pro).format('YYYY-MM-DD')+"_"+prop.id] ? arr_persons[moment(pro).format('YYYY-MM-DD')+"_"+prop.id] : 0;
                let gs = getStaged(pro, date_marked, prop.id, date_issue);
                dt.push(gs);
                return <><AttendanceBox 
                            candidates={date_marked}
                            client={prop.id}
                            issue={date_issue}
                            mydate={pro} 
                            key={ind} 
                            setData={(a, b)=>changeData(a, b)}
                            />
                        </>


             })}

                  {leaves.map((r, i)=>{
                    let cnt = Array.isArray(dt) ? dt.filter(rw=>parseInt(rw) === parseInt(r.id)).length : 0;
                    return <td key={i} className='text-center'>
                            {cnt}
                            </td>

                        })}
         </tr>
     })
    
    return(
        <>
        <CRow className=" d-flex row mb-20">
            {
                leaves.map((prp, ind)=>{
                    return  <CButton key={ind} className="text-center" style={{backgroundColor: prp.color}}><strong>{prp.name}</strong></CButton>
                })
            }
        </CRow>
        <CRow className='m-10'>
            <CCol>
                <CLabel><strong>Start Date</strong></CLabel>
                <CInput
                    name="starts"
                    type='date'
                    value={firstday}
                    onChange={(e)=>setfirstday(e.target.value)}
                />
            </CCol>
            <CCol>
            <CLabel><strong>End Date</strong></CLabel>
                <CInput
                    name="ends"
                    type='date'
                    value={lastday}
                    onChange={(e)=>setlastday(e.target.value)}
                />
            </CCol>
        </CRow>
        <CContainer fluid>
            <CRow scrolling>
        <table border='ipx solid' style={{backgroundColor:'white', marginTop:'50px'}}>
            <thead>
                <tr>
                    <th className='text-center'><strong>DAYS</strong></th>
                    {alldays}{allpara}
                </tr>
                <tr>
                    <th className='text-center'><strong>STUDENT NAMES</strong></th>
                    {alldates}
                </tr>
            </thead>
            <tbody>
                {studenx}
            </tbody>
        </table>
        </CRow>
        </CContainer>
        </>
    )
}
const mapStateToProps = (state) =>({
    
    students:state.studentReducer.students,
    studentattendance : state.studentattendanceReducer,
    user:state.userReducer

  })
  export default connect(mapStateToProps, {
    getStudentattendances,
    getStudentattendancedailys,
    getStudentattendance,
    registerStudentattendance,
    registerStudentattendancedaily,
    updateStudentattendance,
    updateStudentattendancedaily,
    deleteStudentattendance,
    deleteStudentattendancedaily
  })(Studentattendance)
