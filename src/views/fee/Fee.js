import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentfees, getStudentfee, registerStudentfee, updateStudentfee, deleteStudentfee} from './../../actions/student/studentfee';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CCardHeader,
  CButton,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CLabel,
  CInput,
  CFormGroup,
  CTooltip,
  CButtonGroup,
  CContainer
} from '@coreui/react'
import moment from 'moment'
import StudentfeeForm from'./FeeForm'
import StudentfeeTable from'./FeeTable'
import Header from './../setting/Stage/Header';
import StaffDashboardDefault from '../staff/StaffDashboardDefault';
import FeeDetails from './FeeDetails';
import FeeStudent from './FeeStudent';
import FeeSummary from './FeeSummary';
import CIcon from '@coreui/icons-react';
import { numberformat } from '../../actions/common';


const Studentfee = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [startdate, setstartdate] = useState(null)
  const [enddate, setenddate] = useState(null)
  const [small, setsmall] = useState(false)
  const [small1, setsmall1] = useState(false)
  const [collapse1, setcollapse1] = useState(false)
  const [fontz, setfontz] = useState('0.9em')


  const summer = (arr) =>{
    if(arr !== undefined && Array.isArray(arr))
    {
      let ar = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      return ar;
    }else
    {
      return 0;
    }

  }

  const lunchData =()=>{
    if(props.user.activeterm !== undefined && props.user.activeterm.hasOwnProperty('id') && parseInt(props.user.activeterm.id) > 0)
    { 
     let params = {
      data:JSON.stringify(
      {
          'sessionid': props.user.activeterm.sessionid,
          'termid' : props.user.activeterm.id,
          'starts': moment(startdate).format("YYYY-MM-DD"),
          'ends': moment(enddate).format("YYYY-MM-DD")
      }),
      cat:'studentfeesmo',
      table:'studentfeesmo',
      narration:'get studentfees'
      }
      props.getStudentfees(params)
    }

  }
  let data = props.studentfees.studentfees && Array.isArray(props.studentfees.studentfees) ? props.studentfees.studentfees.filter(rw =>rw !== null || rw !== undefined) : []
  let datas = data;
  //let datas = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let struc = {};
  datas.forEach((ele)=>{
    if(struc.hasOwnProperty(ele.studentid))
    {
        struc[ele.studentid][ele.grp].push(parseFloat(ele.amount))
    }else
    {
        struc[ele.studentid] = {}
        struc[ele.studentid][0] = []
        struc[ele.studentid][1] = []
        struc[ele.studentid][2] = ele.studentname;
        struc[ele.studentid][3] = ele.classname;
        struc[ele.studentid][4] = ele.classid;

        if(parseInt(ele.grp) === 0)
        {
          struc[ele.studentid][0].push(parseFloat(ele.amount))
        }else
        {
          struc[ele.studentid][1].push(parseFloat(ele.amount))
        }
    }
  })

  let strucs = []
  Object.keys(struc).forEach((ele)=>{
      let struc1 = {};
      struc1[0] = struc[ele][0].reduce((a, b) => a + b, 0);
      struc1[1] = struc[ele][1].reduce((a, b) => a + b, 0);
      struc1[2] = struc[ele][2];
      struc1[3] = struc[ele][3];
      struc1[4] = struc[ele][4];
      strucs.push(struc1);
  })


  let sumar = {}
  strucs.forEach(ele=>{
    if(sumar.hasOwnProperty(ele[4]))
    {
      sumar[ele[4]][0].push(ele[0])
      sumar[ele[4]][1].push(ele[1])
      let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(dif >= 0)
        {
          //student still owing
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }else if(parseFloat(dif) < 0 )
        {
          //student been owed
          sumar[ele[4]][4].push(dif * -1)
        }
    }else
    {
        sumar[ele[4]] = {}
        sumar[ele[4]][0] = []
        sumar[ele[4]][1] = []
        sumar[ele[4]][0].push(ele[0])
        sumar[ele[4]][1].push(ele[1])
        sumar[ele[4]][2] = ele[3];
        sumar[ele[4]][3] = []
        sumar[ele[4]][4] = []

        let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(parseFloat(dif) >= 0 )
        {
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }
        else if(parseFloat(dif) < 0 )
        {
          sumar[ele[4]][4].push(dif * -1)
        }
    }
  })
  
 
  let sumarx = []
  Object.keys(sumar).forEach(ele=>{
      let sumar1 = {};
      sumar1[0] = sumar[ele][0].reduce((a, b) => a + b, 0);
      sumar1[1] = sumar[ele][1].reduce((a, b) => a + b, 0);
      sumar1[3] = sumar[ele][3].reduce((a, b) => a + b, 0);
      sumar1[4] = sumar[ele][4].reduce((a, b) => a + b, 0);
      sumar1[2] = sumar[ele][2];
      sumarx.push(sumar1);
  })

   //let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let data1 = props.data && Array.isArray(props.data) ? props.data.filter(rw =>(rw !== null || rw !== undefined) && parseInt(rw.grp) === 1) : []
  let studs_money = {};
  data1.forEach(ele => {
      if(studs_money.hasOwnProperty(ele.studentid))
      {
        studs_money[ele.studentid].push(ele.amount);
      }else
      {
        studs_money[ele.studentid] = [];
        studs_money[ele.studentid].push(ele.amount);
      }
  });
  let studs_money_sum = {};
  Object.keys(studs_money).forEach(ele =>{
    if(studs_money.hasOwnProperty(ele))
    {
      let arr = studs_money[ele];
      let sums = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      studs_money_sum[ele] = sums;
    }
  })

  const balvalues = (studentid, fees, bal) =>{
    let st = {...stores};

    let amt = fees - bal;

    if(amt > 0)
    {
        return <i className='text-secondary'>({Number(amt).toFixed(2)})</i>;
    }else if(amt === 0)
    {
        return '-';
    }else if(amt < 0)
    {
        //st[studentid] = amt;
        //setstore
        return <i className='text-info'>{Number(amt).toFixed(2)}</i>
    }

  }

    
    let stores = {};
    let tabl = data.filter(rw=>rw != null && rw.grp == 0).map((row, ind)=>{
    let feez = studs_money_sum.hasOwnProperty(row.studentid) && parseFloat(studs_money_sum[row.studentid]) > 0 ? studs_money_sum[row.studentid] : 0;
    studs_money_sum[row.studentid] = feez;
    let fz = 1
    return <tr key={ind} style={{padding:'2px'}} title={row.staffname} style={{backgroundColor:ind % 2 == 0? '#ccc': "#fff", color:ind % 2 == 0? '#000': "#000", }}>
              <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
              <td style={{padding:'2px'}}  className='text-center'>{row.termname}</td>
              <td style={{padding:'2px'}}  className='text-center'>{row.classname}</td>
              <td style={{padding:'2px'}}>{moment(row.datepaid).format('DD-MM-YYYY')}</td>
              <td style={{padding:'2px'}}>{row.teller}</td>
              <td style={{padding:'2px'}}>{row.studentname}</td>
              <td style={{padding:'2px'}} className={`text-right ${fz === 0 ? 'text-info' :''}` }>{row.accountname}</td>
              <td style={{padding:'2px'}} className='text-right'>{numberformat(row.amount)}</td>
              <td style={{padding:'2px'}} className='text-right'>
                {
                  row.staffname
                }
              </td>
              <td style={{padding:'2px'}} className='text-center'> 
                  {props.editer === true ?
                  <>
                  <a style={{cursor:'pointer'}} onClick={()=>onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                  <a style={{cursor:'pointer'}} onClick={()=>onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                  </>:""}
              </td>
            </tr>
})
  
    let duc1 = [];
    let duc2 = [];
    let duc3 = [];
    let duc4 = [];
    let tabl1 = strucs.filter(rw=>rw != null ).map((roow, ind)=>{
      let row = roow;
      let dif = row[1] - row[0];
      duc1.push(row[1]);
      duc2.push(row[0]);
      let fz= dif > 0 ? 0 : 1;
      dif > 0 ? duc3.push(dif) : duc4.push(dif * -1);
      return <tr key={ind} style={{padding:'2px'}} title={row[2]}>
              <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
              <td style={{padding:'2px'}} >{row[2]}</td>
              <td style={{padding:'2px'}}  className='text-center'>{row[3]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[1]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[0]}</td>
              { fz === 1 ?
                  <>
                  <td style={{padding:'2px'}} className='text-right'>{parseFloat(dif) === 0 ? '-' : Number(dif  * -1).toFixed(2)}</td>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  </>
                  :
                  <>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  <td style={{padding:'2px'}} className='text-right'>{Number(dif).toFixed(2)}</td>
                  </>
              } 
            </tr>
        });

    let ruc1 = [];
    let ruc2 = [];
    let ruc3 = [];
    let ruc4 = [];
    let tabl2 = sumarx.filter(rw=>rw != null).map((roow, ind)=>{
      let row = roow;
      let dif = row[1] - row[0];
      ruc1.push(row[1]);
      ruc2.push(row[0]);
      let fz= dif > 0 ? 0 : 1;
      dif > 0 ? ruc3.push(dif) : ruc4.push(dif * -1);
      return <tr key={ind} style={{padding:'2px'}} title={row[2]}>
              <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
              <td style={{padding:'2px'}} >{row[2]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[1]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[0]}</td>
              { fz === 1 ?
                  <>
                  <td style={{padding:'2px'}} className='text-right'>{parseFloat(dif) === 0 ? '-' : Number(dif  * -1).toFixed(2)}</td>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  </>
                  :
                  <>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  <td style={{padding:'2px'}} className='text-right'>{Number(dif).toFixed(2)}</td>
                  </>
              }
              
            </tr>
        })

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET STUDENTFEES PER SCHOOL
  useEffect(() => {
    let dt = new Date();
    let started  = new Date(dt.getFullYear(), dt.getMonth(), 1);
    let ended = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

    if(props.user.activeterm !== undefined && props.user.activeterm.hasOwnProperty('id') && parseInt(props.user.activeterm.id) > 0)
    { 
     let params = {
      data:JSON.stringify(
      {
          'sessionid': props.user.activeterm.sessionid,
          'termid' : props.user.activeterm.id,
          'starts': moment(started).format("YYYY-MM-DD"),
          'ends': moment(ended).format("YYYY-MM-DD")
      }),
      cat:'studentfeesmo',
      table:'studentfeesmo',
      narration:'get studentfees'
      }
      props.getStudentfees(params)
    }
    
  }, [props.user.activeterm])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setCollapse(true);
  }

  const onDelete = (rw, dt) =>{
    
  }

  
 

  const onReset = () =>{
    setId(null);
    setDts({});
  }

  const onClose = () =>{
    setCollapse(false)
  }
 
   
   return (
     <>
     <CModal 
              show={small} 
              onClose={() => setsmall(!small)}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Select Date Range</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="startdate"> Start Date</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="startdate" 
                            type="date" 
                            size="sm"  
                            value={startdate}
                            defaultValue={startdate}
                            onChange={(e)=>setstartdate(e.target.value)}
                            />
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="enddate">End Date</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="enddate"  
                            type="date" 
                            size="sm"  
                            value={enddate}
                            defaultValue={enddate}
                            onChange={(e)=>setenddate(e.target.value)}
                            />
                        </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={lunchData}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setsmall(!small)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
     <CCollapse show={collapse}>
            <StudentfeeForm 
                id={id}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    <CCol xs="12" md="12"   >
     <CCard>
         <CHeader xs="12">
           <CContainer>
            <CRow xs="12">
           <CCol xs="12" md="6" className="p-20">
           <span className="h4">Fees Log</span>{" "}<small>{`${moment(startdate).format("Do MMM YYYY") != 'Invalid date' ? moment(startdate).format("Do MMM YYYY"):''} ${moment(enddate).format("Do MMM YYYY") != 'Invalid date' ? moment(enddate).format("Do MMM YYYY") :''}`}</small>
            </CCol>
            <CCol xs="12" md="6">
         <span className="pull-right">
           <CButtonGroup>
           <CTooltip content="Add an expense">
           <CButton color='success' className="d-print-none" onClick={()=>setcollapse1(prev=>!prev)} outline>

             <CIcon name={collapse1 == false ? "cil-plus" :"cil-chevron-double-up"} />
          </CButton> 
          </CTooltip>
         <CTooltip content="Filter by Category, subcategory or account">
          <CButton 
              onClick={() => setsmall1(!small1)} 
              className="d-print-none" 
              color="secondary"
            >
              <CIcon name="cil-filter" />
            </CButton>
            </CTooltip>
          <CTooltip content="Filter by date">
              <CButton 
                  onClick={() => setsmall(!small)} 
                  className="d-print-none" 
                  color="secondary"
                >
                  <CIcon name="cil-calendar" />
                </CButton>
            </CTooltip>
         
          <CTooltip content="Add Font">
           <CButton color='secondary' className="d-print-none" onClick={()=>setfontz(prev=>prev+0.1)} outline>
             
             <CIcon name="cil-text-size" />
             
          </CButton> 
          </CTooltip>
          <CTooltip content="reduce Font">
           <CButton color='dark' className="d-print-none" onClick={()=>setfontz(prev=>prev-0.1)} outline>
            
             <CIcon name="cil-text-size" />
          </CButton> 
          </CTooltip>
          </CButtonGroup>
         </span>
       
           </CCol>
         </CRow>
         </CContainer>
          </CHeader>
        <CCardBody className="m-0 p-0">
        <CTabs >
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Fees Paid
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Students
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Class
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                    <FeeDetails
                      tabl={tabl}
                      onEdit={(rw)=>onEdit(rw)}
                      onDelete={(rw)=>onDelete(rw)}
                      editer={true}
                    />
                </CTabPane>
                <CTabPane>
                    <FeeStudent 
                      tabl={tabl1}  
                      summer={(e)=>summer(e)} 
                      duc1={duc1}
                      duc2={duc2}
                      duc3={duc3}
                      duc4={duc4}
                      />
                </CTabPane>
                <CTabPane>
                    <FeeSummary 
                        tabl={tabl2}  
                        summer={(e)=>summer(e)} 
                        ruc1={ruc1}
                        ruc2={ruc2}
                        ruc3={ruc3}
                        ruc4={ruc4}
                        />
                </CTabPane>
              </CTabContent>
            </CTabs>          
        </CCardBody>
      </CCard>
    </CCol>
    </> 
  )
}
const mapStateToProps = (state) =>({
  studentfees : state.studentfeeReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getStudentfees,
  updateStudentfee,
  deleteStudentfee,
  getStudentfee,
  registerStudentfee
})(Studentfee)
