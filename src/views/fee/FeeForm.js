import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { registerStudentfee, updateStudentfee, deleteStudentfee } from './../../actions/student/studentfee';
import { getAccounts } from './../../actions/setting/account';
import { getFees } from './../../actions/setting/fee';
import SearchStudent from './../staff/SearchDashboard2';
import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CButton,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CCardFooter,
  CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Studentfees = (props) => {
    const sid = props.sid
    const [id, setId] = useState(null)
    
    //EDUCATION
    const [studentid, setStudentid] = useState(null)
    const [termid, setTermid] = useState(null)
    const [sessionid, setSessionid] = useState(null)
    const [amount, setAmount] = useState(0)
    const [accountid, setAccountid] = useState()
    const [feeid, setFeeid] = useState()
    const [datepaid, setDatepaid] = useState()
    const [student, setStudent] = useState()

    useEffect(() => {
      if(parseInt(props.rowid) > 0)
      {
        let data = props.data; 
        setId(data.id)
        setStudentid(data.studentid)
        setStudentid(data.schoolid)
        setAmount(data.amount)
        setTermid(data.termid)
        setAccountid(data.accountid)
        setDatepaid(data.datepaid)
      }
    }, [props.rowid])

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
    
      
    
    const handleSubmit = () =>{
        let mt = props.user !== undefined && props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns : [[], []];
        let marray ='';
        let ar = 0;
         if(mt.length > 0)
         {
            marray = mt[0].filter(rw=>rw.termid === termid);
            ar = marray && Array.isArray(marray)  && marray.length > 0 ? marray[0].sessionid : null;
        }
        console.log(marray)
            let fd = new FormData();
            fd.append('studentid', studentid);
            fd.append('amount', amount);
            fd.append('termid', termid);
            fd.append('datepaid', datepaid);
            fd.append('sessionid', ar);
            fd.append('schoolid', props.user.activeschool.id)
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

    const onStudent= (val) =>{
        setStudent(val)
        setStudentid(val.id)
    }
    
    const changefeeid= (e) =>{
        setFeeid(e.target.value)
    }
    const changeaccountid= (e) =>{
        setAccountid(e.target.value)
    }
    const changetermid= (e) =>{
        let v = e.target.value;
        //GET SESSION

        setTermid(v)
        setSessionid()
    }
    
let dt = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns : [[], []];
 let temarray ='';
 
  if(dt.length > 0)
  {
     temarray = dt[0].map((prop, ind)=>{
    return <option key={ind}  value={prop.termid}>{prop.name}</option>;
    });
}


let fearray = props.fees && props.fees!== undefined && Array.isArray( props.fees)? props.fees.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''

let acarray = props.accounts && props.accounts !== undefined && Array.isArray( props.accounts)  ? props.accounts.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
  return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''

let { name, photo} = student || ''

  return (
    <>
    <CRow className='align-center mx-auto d-flex ' style={{width:'600px'}} sm={12}>
    <CCol sm="6" md="6" className='mx-auto'>
                    <CCard>
                      <CCardHeader>
                        <h4>{parseInt(id) > 0 ? 'Edit':'Add'}</h4>
                      </CCardHeader>
                        <CCardBody>
                        <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="studentid">Student<i className='text-danger'>*</i></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">   
                                    <SearchStudent studentz={(rw)=>onStudent(rw)}  />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="termid">Term<i className='text-danger'>*</i></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">  
                                <CSelect 
                                        custom 
                                        id="termid" 
                                        onChange={changetermid} 
                                        placeholder="Select Fee"
                                    >
                                        <option></option>
                                        {temarray}
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="feeid">Fee<i className='text-danger'>*</i></CLabel>
                                </CCol>
                                <CCol xs="12" md="9"> 
                                <CSelect 
                                        custom 
                                        id="feeid" 
                                        onChange={changefeeid} 
                                        placeholder="Select Fee"
                                    >
                                        <option></option>
                                        {fearray}
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="accountid">Account</CLabel>
                                </CCol>
                                <CCol xs="12" md="9"> 
                                <CSelect 
                                    custom 
                                    id="accountid" 
                                    placeholder="Select Account"
                                    onChange={changeaccountid} 
                                        
                                    >
                                    <option></option>
                                    {acarray}
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="amount">Date Paid</CLabel>
                                </CCol>
                                <CCol xs="12" md="9"> 
                                <CInput 
                                        id="date_paid" 
                                        type='date'
                                        defaultValue={datepaid}
                                        placeholder=""
                                        onChange={(e)=>setDatepaid(e.target.value)} 
                                        />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row> 
                                <CCol md="3">
                                <CLabel htmlFor="amount">Amount Paid</CLabel>
                                </CCol>
                                <CCol xs="12" md="9"> 
                                <CInput 
                                        id="amount" 
                                        type='text'
                                        defaultValue={amount}
                                        placeholder="0000.00"
                                        onChange={(e)=>setAmount(e.target.value)} 
                                        />
                                </CCol>
                            </CFormGroup>
                        </CForm>   
                        </CCardBody>
                        <CCardFooter>
                            <CButton block type="submit" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton block type="button" size="sm" color="danger" onClick={()=>props.handleClose()}><CIcon name="cil-ban" /> Close</CButton><br/>
                            <CButton block type="sbutton" size="sm" color="warning" onClick={()=>props.handleClose()}><CIcon name="cil-ban" /> Clear</CButton><br/>
                        </CCardFooter>
                    </CCard>
                    </CCol>
                    <CCol sm="6" md="6" className='mx-auto'>
                        <CCard className='h-100'>
                            <CCardBody>
                                <CRow xs={12} style={{backgroundColor:'red'}} className="text-center d-flex justify-contents-center align-items-center m-auto" >
                                    <CCol>
                                    <img
                                        src={process.env.REACT_APP_SERVER_URL + photo}
                                        height='100px'
                                        alt="profile-image" 
                                        onError={(e)=>{e.target.onerror=null; e.target.src='/icons/profile_1.png'} }
                                    />
                                    </CCol>
                                    <CCol>
                                    <h4 style={{color:'white'}}>{name}</h4>
                                    </CCol>
                                    
                                </CRow>
                                <CRow className="text-center d-flex m-auto p-auto align-items-center">
                                   
                                </CRow>
                                <CRow>
                                    
                                </CRow>

                            </CCardBody>
                        </CCard>
                    </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    user : state.userReducer,
    fees : state.feeReducer.fees,
    accounts : state.accountReducer.accounts,
    users : state.userReducer,

  })
  export default connect(mapStateToProps, {
    registerStudentfee,
    updateStudentfee,
    getAccounts,
    getFees
    
  })(Studentfees)
  
