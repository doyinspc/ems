import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStudentattendanceSummary } from './../../../actions/student/studentattendance';

import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react'


const Dashboards= (props) => {
    let termid = props.termid;
    let sessionid = props.sessionid;

    const [firstday, setfirstday] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), -1))
    const [lastday, setlastday] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
    const [datax, setdatax] = useState({})
    
    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'sessionid':sessionid,
                'termid':termid,
                'schoolid':props.user.activeschool.id,
                'starts':moment(firstday).format('YYYY-MM-DD'),
                'ends':moment(lastday).format('YYYY-MM-DD')
            }),
            cat:'dataattendance',
            table:'attendances',
            narration:'get all attendance'
            }
        props.getStudentattendanceSummary(params)
        return () => {
            //cleanup
        }
    }, [termid, sessionid, firstday, lastday])

    
 
    
   
   let data = props.summary && Array.isArray(props.summary) && props.summary.length > 1 && Array.isArray(props.summary[0])? props.summary[0].filter(rw=>rw.id !== null):[];
   let data1 = props.summary && Array.isArray(props.summary) && props.summary.length > 1 && Array.isArray(props.summary[1]) ? props.summary[1].filter(rw=>rw.id !== null):[];
   
    var listDate = [];
    var startDate = firstday;
    var endDate = lastday;
    var dateMove = new Date(startDate);
    var strDate = startDate;

    while (new Date(strDate) < new Date(endDate)){
            var strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
    };
    var getdates = {};
    data.forEach(prop =>{
        if(Object.keys(getdates).includes(moment(prop.dates).format('YYYY-MM-DD')))
        {
            let res = prop.reason.split(",");
            getdates[moment(prop.dates).format('YYYY-MM-DD')].push(res.length);
        }else
        {
            getdates[moment(prop.dates).format('YYYY-MM-DD')] = [];
            let res = prop.reason.split(",");
            getdates[moment(prop.dates).format('YYYY-MM-DD')].push(res.length);
        }  
    })
    var getdatex = {};
    data1.forEach(prop =>{
        if(Object.keys(getdatex).includes(moment(prop.dates).format('YYYY-MM-DD')))
        {
            getdatex[moment(prop.dates).format('YYYY-MM-DD')].push(prop.clientid);
        }else
        {
            getdatex[moment(prop.dates).format('YYYY-MM-DD')] = [];
            getdatex[moment(prop.dates).format('YYYY-MM-DD')].push(prop.clientid);
        }  
    })

    var getabsents = {};
    var getabsentsname = {};
    var getabsentsdata = {};
    data1.forEach(prop =>{
        if(Object.keys(getabsents).includes(prop.clients))
        {
            getabsents[prop.clients].push(moment(prop.dates).format('YYYY-MM-DD'));
        }else
        {
            getabsents[prop.clients] = []
            getabsentsname[prop.clients] = prop.clientname;
            getabsentsdata[prop.clients] = prop.clientdata.split("::::");
            getabsents[prop.clients].push(moment().format(prop.dates,'YYYY-MM-DD'));
        }  
    })
    
    let popu = {}
    listDate.forEach(prop =>{
        let all_students_counted = getdates[moment().format(prop,'YYYY-MM-DD')] 
                            && Array.isArray(getdates[moment().format(prop,'YYYY-MM-DD')]) 
                            && getdates[moment().format(prop,'YYYY-MM-DD')].length > 0 ?
                            getdates[moment().format(prop,'YYYY-MM-DD')].reduce((a, b)=>parseInt(a) + parseInt(b), 0) :
                            0;
        let all_not_available = getdatex[moment().format(prop,'YYYY-MM-DD')] 
                                && Array.isArray(getdatex[moment().format(prop,'YYYY-MM-DD')]) 
                                && getdatex[moment().format(prop,'YYYY-MM-DD')].length > 0 ?
                                getdatex[moment().format(prop,'YYYY-MM-DD')].length : 0;

        let diff = all_students_counted - all_not_available;

        popu[moment().format(prop,'YYYY-MM-DD')] = diff;
    })
    
   let attendancearray = {};
   let attendancesarray = [];
   let payarray = {};
   let namearray = {};
   let sumpop = [];
   let sumattendance = [];
   let sumpay = [];


   data.forEach(element => {
      
       let nm = element.name;
       let pop = parseInt(element.nums);
       let pay = parseFloat(element.pay) > 0 ? parseFloat(element.pay) : 0;
       
       if(parseInt(element.grp) > 0)
       {
         attendancearray[element.id] =  pay;
         sumattendance.push(pay)
       }else{
         payarray[element.id] =  pay;
         sumpay.push(pay)
       }

       if(Object.keys(namearray).includes(element.id))
       {
            
       }else{
            namearray[element.id] = nm;
       }

   });
   
   Object.keys(namearray).forEach(element => {
       let arr = {}
       let attendance = attendancearray[element];
       let pay = payarray[element];
       let money = parseFloat(pay) > 0  && parseFloat(attendance) > 0 ? (parseFloat(pay)/parseFloat(attendance)) * 100 : 0;

        arr['name'] = namearray[element];
        
        arr['attendance'] = attendance;
        arr['pay'] = pay;
        arr['pop'] = attendance - pay;
        arr['money'] = money;

        attendancesarray.push(arr)
   });


    return (
    <>
     <CRow>
        <CCol>
          <CCard>
            <CCardBody>
            <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Student Attendance</h4>
                <div className="small text-muted">{moment(new Date()).format('MMMM YYYY')}</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>

              <CRow>
              <CCol xs="12" md="12" xl="12"></CCol>
              </CRow>
              <br />

              <CCol xs="12" sm="12" md="12">
                <CCardBody>
                <CChartLine
                    type="barchart"
                    datasets={[
                        {
                        data: Object.values(popu),
                        label: 'student',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 4,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        }
                    ]}
                    labels={Object.keys(popu)}
                    options={{
                    tooltips: {
                        enabled: true
                    }
                    }}
                />
                </CCardBody>
            </CCol>
      
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Absentees {' - '} {`${moment(firstday).format('DD, MMM YYYY')} - ${moment(lastday).format('DD, MMM YYYY')}`}
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Student Name</th>
                    <th className="text-center">
                      <CIcon height={25} name="cil-phone" />
                      </th>
                      <th className="text-center">
                      <CIcon height={25} name="cil-envelope-letter" />
                      </th>
                      <th className="text-center">
                      <i className='fa fa-whatsapp fa-2x'></i>
                    </th>
                    <th>Absents</th>
                  </tr>
                </thead>
                <tbody>
                 { Object.keys(getabsentsname).map((prop, ind)=>{
                 return <tr key={ind}>
                    <td className="text-center">
                      <div className="c-avatar">
                      <img 
                        src={process.env.REACT_APP_SERVER_URL+  getabsentsdata[prop][1]} 
                        className="c-avatar-img" 
                        alt={getabsentsdata[prop][0]} 
                        onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL+'/icons/profile_1.png'} }
                        />
                        
                      </div>
                    </td>
                    <td>
                      <div>{getabsentsname[prop]}</div>
                      <div className="small text-muted">
                 <span>{getabsentsdata[prop][0]}</span> | {`${getabsentsdata[prop][2]} ${getabsentsdata[prop][3]} ${getabsentsdata[prop][4]} ${getabsentsdata[prop][5]}`}
                      </div>
                    </td>
                    
                    
                    <td className="text-center">
                      <CIcon height={25} name="cil-phone" />
                      </td>
                      <td className="text-center">
                      <CIcon height={25} name="cil-envelope-letter" />
                      </td>
                      <td className="text-center">
                      <i className='fa fa-whatsapp fa-2x'></i>
                    </td>
                    <td>
                      <div className="small text-muted">Absent</div>
                 <strong>{getabsents[prop].length > 1 ? `${getabsents[prop].length} days`  : '1 day'}</strong>
                    </td>
                  </tr>
                  })}
                  </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    
   
    </>
  )
}

const mapStateToProps = (state) =>({
    summary:state.studentattendanceReducer.studentattendancesummary,
    user:state.userReducer
  })
export default connect(mapStateToProps,{getStudentattendanceSummary})(Dashboards)
  
  
