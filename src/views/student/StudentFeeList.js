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
import FeesCard from './FeesCard';

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
    
    return <FeesCard
              key={ind}
              studentname = {`${row.surname} ${row.firstname} ${row.middlename}`}
              row={row}
              std={std}
              staffarray={staffarray}
              acarray={acarray}
              fearray={fearray}
              termid={props.termid}
              sessionid={props.sessionid}
              classteacher={props.classteacher}
            /> 
})
              :'';
  return (
   <>
   
   <table className="table  table-outline mb-0 ">
                
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
