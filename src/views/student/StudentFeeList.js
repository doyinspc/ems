import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getStudentfees, registerStudentfee, updateStudentfee,  getStudentfeesSingle, deleteStudentfee, setStudentfee } from './../../actions/student/studentfee';
import { updateStudentclass } from './../../actions/student/studentclass';
import { getAccounts } from './../../actions/setting/account';
import { getStaffAll } from './../../actions/staff/staff';
import { getFees } from './../../actions/setting/fee';
import moment from 'moment';
import { 
  CDropdownItem,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownDivider,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputCheckbox,
  CLabel,
  CButton, 
  CSelect,
  CButtonClose,
  CButtonGroup
} from '@coreui/react';
import { nairaformat } from '../../actions/common';
import CIcon from '@coreui/icons-react';
import Swal from'sweetalert'

const Studentclasss = (props) => {
   let clasz = props.clasz;
   let terms = props.termid;
   let sessions = props.sessionid;
   let data1 = props.data1;
  
   const [id, setId] = useState(null)
   const [datepaid, setDatepaid] = useState(new Date())
   const [amount, setAmount] = useState(0)
   const [accountid, setAccountid] = useState(null)
   const [feeid, setFeeid] = useState(null)
   const [staffid, setstaffid] = useState(null)
   const [teller, setTeller] = useState(null)
   const [data, setdata] = useState()

   useEffect(() => {
   
    if(props.users.activeschool !== undefined && props.users.activeschool.hasOwnProperty('id') && parseInt(props.users.activeschool.id) > 0)
    {
     let params = {
      data:JSON.stringify(
      {
          'sessionid':sessions,
          'termid':terms,
          'ids':data1
      }),
      cat:'studentfeess',
      table:'studentfeess',
      narration:'get student fees'
     }
     props.getStudentfees(params)

    }
    
  }, [props.users.activeschool, clasz, terms, sessions, data1 ])

   useEffect(() => {
   
     let params = {
      data:JSON.stringify(
      {
          'is_active':0,
          'is_delete':0
      }),
      cat:'selected',
      table:'allstaffs',
      narration:'get all staff'
     }
     props.getStaffAll(params) 
  }, [])

   useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
          //'schoolid':props.user.activeschool.id
          is_active:0
      }),
      cat:'selected',
      table:'accounts',
      narration:'get accounts'
     }
     props.getAccounts(params)

     let params1 = {
        data:JSON.stringify(
        {
            //'schoolid':props.user.activeschool.id
            is_active:0
        }),
        cat:'selected',
        table:'fees',
        narration:'get feess'
       }
       props.getFees(params1)
    }
    
  }, [props.user.activeschool])
  
   useEffect(() => {
      let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
      setdata(data)
   }, [props.data])
  const handleSubmitStudent = (id) =>{
    let fd = new FormData();
    fd.append('parentid', staffid);
    fd.append('id', id);
    fd.append('cat', 'updatestudentclasss');
    fd.append('table', 'accessstudentclass');
    fd.append('sessionid', sessions);
    props.updateStudentclass(fd)

}
   const handleSubmitFee = (studentid, termid, sessionid) =>{

        let fd = new FormData();
        
        fd.append('studentid', studentid);
        fd.append('termid', termid);
        fd.append('claszid', props.claszparentid);
        fd.append('sessionid', sessionid);
        fd.append('staffid', props.user.mid);
        fd.append('cat', 'insertsetfee');
        fd.append('table', 'studentfeez');

        props.setStudentfee(fd);

   }
   const handleSubmitFeeOnly = (studentid, termid, sessionid) =>{

    let fd = new FormData();
    
    fd.append('studentid', studentid);
    fd.append('amount', amount);
    fd.append('feeid', feeid);
    fd.append('termid', termid);
    fd.append('claszid', props.claszparentid);
    fd.append('sessionid', sessionid);
    fd.append('staffid', props.user.mid);
    fd.append('cat', 'insertsetfees');
    fd.append('table', 'studentfeez');

    props.setStudentfee(fd);

   }
   const handleSubmit = (studentid, termid, sessionid) =>{

    let fd = new FormData();
    fd.append('studentid', studentid);
    fd.append('amount', amount);
    fd.append('termid', termid);
    fd.append('teller', teller);
    fd.append('datepaid', moment(datepaid).format("YYYY-MM-DD"));
    fd.append('sessionid', sessionid);
    fd.append('schoolid', props.user.activeschool.id)
    fd.append('staffid', props.user.mid);
    fd.append('accountid', accountid);
    fd.append('feeid', feeid);
    fd.append('table', 'studentfees');

    if(id && parseInt(id) > 0)
    {
        fd.append('id', id);
        fd.append('cat', 'updatefee');
        fd.append('narration', 'Fees Payment Update');
        props.updateStudentfee(fd)
    }else
    {
        fd.append('cat', 'insertfee');
        fd.append('narration', 'Fees Payment');
        fd.append('staffid', props.user.mid);
        props.registerStudentfee(fd)  
    }


   }
  const lStudent = (id) =>{
    window.open(process.env.PUBLIC_URL+"#/students/"+id)
  }

const onDelete = (id) =>{
  Swal("Are you sure you want to delete you will not be able to restore the data.")
  .then((value) => {
    if(value == true && parseInt(id) > 0){
      let fd = new FormData();
      fd.append('id', id)
      fd.append('sessionid', sessions)
      fd.append('cat', 'deletefee')
      fd.append('table', 'fees')
      fd.append('narration', 'delete students fees slready recorded')
      props.deleteStudentfee(fd, id);
    }else{
      Swal(`Not deleted`);
    }
  })

}

const setDiff=(subzs, addzs)=>
{
  let subz = subzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
  let addz = addzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
  let diff = subz - addz;
  if(diff > 0)
  {
    return <><span className='text-danger'><strong>{nairaformat(diff)}</strong></span></>
  }else{
    return <span className='text-info'><strong>{nairaformat(diff * -1)}</strong></span>
  }

}
//console.log(new Date(new Date().setHours(new Date().getHours() + 1)))
let fearray = props.fees && props.fees!== undefined && Array.isArray( props.fees)? props.fees.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''

let staffarray = props.staffs && props.staffs!== undefined && Array.isArray( props.staffs)? props.staffs.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
  return <option key={ind} value={rw.id}>{rw.surname}{" "}{rw.firstname !== undefined && rw.firstname.length > 0  ? rw.firstname.substring(0, 1):''}{". "}({rw.schoolabbrv})</option>
}): ''
let acarray = props.accounts && props.accounts !== undefined && Array.isArray( props.accounts)  ? props.accounts.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''
  let std = props.studentfees && Array.isArray(props.studentfees) ? props.studentfees.filter(rw =>rw != null || rw != undefined) : []
  
  let acct = Array.isArray(data) && data.length > 0 ? data.map((row, ind)=>{
    let subs= [];
    let adds = [];
    return <tr key={ind}>
    <td className="text-center">
     {ind + 1}
     <div className="c-avatar">
        <img 
        src={process.env.REACT_APP_SERVER_URL+ row.photo} 
        className="c-avatar-img" 
        alt={row.admission_no} 
        onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td>
    <div><strong>{`${row.surname} ${row.firstname} ${row.middlename}`}</strong></div>
            <div className="small text-muted">
            <span>{row.schoolabbrv}{row.admission_no}</span>
        </div>
    </td>
    <td>
      { 
        std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 1).map((p, i)=>{
        subs.push(parseFloat(p.amount))
        return <div key={i} className="small text-muted">
                  {props.classteacher ?  new Date() < new Date(new Date(p.date_created).setHours(new Date(p.date_created).getHours() + 4000)) ? <span  style={{cursor:'pointer'}}><CIcon name="cil-trash" onClick={()=>onDelete(p.id)} className="text-danger"/>{' '}</span>:'':''}
                  <span >{p.feename}</span>: <strong >{nairaformat(p.amount)}</strong>
              </div>
      })
      }
    </td>
    <td>
    {parseInt(row.parentid) === 0 ? "": <b><i>{'Recover from source'}<br/>{row.parentname}</i></b>}
    { 
      std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 0).map((p, i)=>{
        adds.push(parseFloat(p.amount))
        return <div key={i} className="small text-muted">
         {props.classteacher ? new Date() < new Date(new Date(p.date_created).setHours(new Date(p.date_created).getHours() + 4000)) && parseInt(row.parentid) === 0 ?  <span style={{cursor:'pointer'}}><CIcon name="cil-trash" onClick={()=>onDelete(p.id)} className="text-danger"/>{' '}</span>:'':''}
                  <span>{moment().format(p.datepaid, 'DD MM YYYY')}</span> : <i>{p.teller}</i>: <strong>{nairaformat(p.amount)}</strong> 
              </div>
      })
    }
    </td>
    <td>
      {setDiff(subs, adds)}
    </td>
    {props.classteacher ? 
    <td className="text-center">
          <CButtonGroup>          
          <CDropdown className="m-0">
              <CDropdownToggle color="secondary" size='sm' block>
                Set Fees
              </CDropdownToggle>
              <CDropdownMenu className='bg-info'>
                <CForm className="px-4 py-3" >
                 
                  <CFormGroup>
                    <CLabel htmlFor="amount">Amount</CLabel>
                    <CInput 
                      className="form-control" 
                      style={{color:'blue', fontWeight:'bolder'}}
                      id="amount" 
                      type="text"
                      value={amount}
                      autoComplete="amount"
                      onChange={(e)=>setAmount(e.target.value)}
                      />
                  </CFormGroup>
                  
                  <CFormGroup>
                    <CLabel htmlFor="feeid">Select Fee</CLabel>
                    <CSelect 
                      className="form-control" 
                      id="feeid" 
                      type="date"
                      value={feeid}
                      autoComplete="feeid"
                      onChange={(e)=>setFeeid(e.target.value)}
                      >
                        <option></option>
                        {fearray}
                      </CSelect>
                  </CFormGroup>
                                    
                  <CFormGroup className="mt-2">
                    <CButton 
                    className='mb-2'
                    size='sm'
                    block
                    color="primary" 
                    type="button"
                    onClick={()=>handleSubmitFeeOnly(row.id, props.termid, props.sessionid)}
                    >Set Fee</CButton>
                    <CButton 
                    block
                      size='sm' 
                      color="secondary" 
                      onClick={()=>handleSubmitFee(row.id, props.termid, props.sessionid)}
                      >Use Default Fee</CButton>
                  </CFormGroup>
                </CForm>
              </CDropdownMenu>
          </CDropdown>
          {parseInt(row.parentid) === 0 ?
          <CDropdown className="m-0">
              <CDropdownToggle color="info" size='sm'>
                Pay Fees
              </CDropdownToggle>
              <CDropdownMenu className='bg-info'>
                <CForm className="px-4 py-3" >
                  <CFormGroup>
                    <CLabel htmlFor="datepaid">Date Paid</CLabel>
                    <CInput 
                      className="form-control" 
                      id="datepaid" 
                      type="date"
                      value={datepaid}
                      autoComplete="email"
                      onChange={(e)=>setDatepaid(e.target.value)}
                      />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="amount">Amount</CLabel>
                    <CInput 
                      className="form-control" 
                      style={{color:'blue', fontWeight:'bolder'}}
                      id="amount" 
                      type="text"
                      value={amount}
                      autoComplete="amount"
                      onChange={(e)=>setAmount(e.target.value)}
                      />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="accountid">Account</CLabel>
                    <CSelect 
                      className="form-control" 
                      id="accountid" 
                      type="date"
                      value={accountid}
                      autoComplete="accountid"
                      onChange={(e)=>setAccountid(e.target.value)}
                      >
                        <option></option>
                        {acarray}
                      </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="teller">Teller</CLabel>
                    <CInput 
                      className="form-control" 
                      id="teller" 
                      type="text"
                      value={teller}
                      autoComplete="teller"
                      onChange={(e)=>setTeller(e.target.value)}
                      />
                      </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="feeid">fee</CLabel>
                    <CSelect 
                      className="form-control" 
                      id="feeid" 
                      type="date"
                      value={feeid}
                      autoComplete="feeid"
                      onChange={(e)=>setFeeid(e.target.value)}
                      >
                        <option></option>
                        {fearray}
                      </CSelect>
                  </CFormGroup>
                  
                  
                  <CFormGroup className="mt-2">
                    <CButton 
                    color="primary" 
                    type="button"
                    onClick={()=>handleSubmit(row.id, props.termid, props.sessionid)}
                    >Pay</CButton>
                  </CFormGroup>
                </CForm>
              </CDropdownMenu>
          </CDropdown>:''} </CButtonGroup>
          
          <CDropdown className="m-0">
              <CDropdownToggle color="dark" size='sm' block>
                Deduct from Source
              </CDropdownToggle>
              <CDropdownMenu className='bg-dark'>
                <CForm className="px-4 py-3" >
                 
                  
                  
                  <CFormGroup>
                    <CLabel htmlFor="staffid">Select Staff Name & School</CLabel>
                    <CSelect 
                      className="form-control" 
                      id="staffid" 
                      type="date"
                      value={staffid}
                      autoComplete="staffid"
                      onChange={(e)=>setstaffid(e.target.value)}
                      >
                        <option></option>
                        {staffarray}
                      </CSelect>
                  </CFormGroup>
                  
              
                  <CFormGroup className="mt-2">
                    <CButton 
                    className='mb-2'
                    size='sm'
                    block
                    color="primary" 
                    type="button"
                    onClick={()=>handleSubmitStudent(row.id)}
                    >Deduct From Source</CButton>
                    
                  </CFormGroup>
                </CForm>
              </CDropdownMenu>
          </CDropdown>
    </td>
    :''}
  </tr>
})
              :'';
  return (
   <>
   
   <table className="table  table-outline mb-0 ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Student ID</th>
                    <th>Studentclass</th>
                    <th className="text-center">FEES</th>
                    <th className="text-center">PAYMENTS</th>
                    <th className="text-center">BALANCE</th>
                    {props.classteacher ? <th className="text-center">Pay</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {acct}
                </tbody>
                </table>
   </>
  )
}

const mapStateToProps = (state) =>({
  user : state.userReducer,
  fees : state.feeReducer.fees,
  accounts : state.accountReducer.accounts,
  users : state.userReducer,
  staffs : state.staffReducer.staffall,
  studentfees : state.studentfeeReducer.studentfees,
  studentfee : state.studentfeeReducer.studentsinglefees
})
export default connect(mapStateToProps, {
  registerStudentfee,
  updateStudentfee,
  getAccounts,
  getFees,
  getStudentfeesSingle,
  setStudentfee,
  getStudentfees,
  deleteStudentfee,
  getStaffAll,
  updateStudentclass
  
})(Studentclasss)
