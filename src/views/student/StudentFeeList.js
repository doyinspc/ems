import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { registerStudentfee, updateStudentfee,  getStudentfeesSingle, deleteStudentfee, setStudentfee } from './../../actions/student/studentfee';
import { getAccounts } from './../../actions/setting/account';
import { getFees } from './../../actions/setting/fee';
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

const Studentclasss = (props) => {
   let history = useHistory()
   const [id, setId] = useState(null)
   const [datepaid, setDatepaid] = useState(new Date())
   const [amount, setAmount] = useState(0)
   const [accountid, setAccountid] = useState(null)
   const [feeid, setFeeid] = useState(null)

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

   const handleSubmit = (studentid, termid, sessionid) =>{

    let fd = new FormData();
    fd.append('studentid', studentid);
    fd.append('amount', amount);
    fd.append('termid', termid);
    fd.append('datepaid', datepaid);
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

const onDelete = () =>{

}

const setDiff=(subzs, addzs)=>
{
  let subz = subzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
  let addz = addzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
  let diff = subz - addz;
  if(diff > 0)
  {
    return <><span>{Number(diff).toFixed(2)}</span></>
  }else{
    return <span>{Number(diff).toFixed(2)}</span>
  }

}

let fearray = props.fees && props.fees!== undefined && Array.isArray( props.fees)? props.fees.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''

let acarray = props.accounts && props.accounts !== undefined && Array.isArray( props.accounts)  ? props.accounts.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
  return <option key={ind} value={rw.id}>{rw.name}</option>
}): ''
  let std = props.studentfees && Array.isArray(props.studentfees) ? props.studentfees.filter(rw =>rw != null || rw != undefined) : []
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
  
  let acct = data.map((row, ind)=>{
    let subs= [];
    let adds = [];
    return <tr key={ind}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
      { 
      std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 1).map((p, i)=>{
        subs.push(parseFloat(p.amount))
        return <div className="small text-muted">
                  <span className='pull-left'><i onClick={()=>onDelete(p.id)} className="text-danger fa fa-remove"></i></span>
                  <span className='pull-left'>{p.feename}</span>: <strong className='pull-right'>{p.amount}</strong>
              </div>
      })
      }
    </td>
    <td>
    { 
      std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 0).map((p, i)=>{
        adds.push(parseFloat(p.amount))
        return <div className="small text-muted">
          <span><i onClick={()=>onDelete(p.id)} className="text-danger fa fa-remove"></i></span>
                  <span>{p.datepaid}</span>: <strong>{p.amount}</strong>
              </div>
      })
      }
    </td>
    <td>
      {setDiff(subs, adds)}
    </td>
    <td>
          <CButtonGroup>
           <CButton 
              size='sm' 
              color="secondary" 
              onClick={()=>handleSubmitFee(row.id, props.termid, props.sessionid)}
              >Set Fee</CButton>
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
            </CDropdown>
            </CButtonGroup>
    </td>
  </tr>
})

  
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
                    <th className="text-center">Pay</th>
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
  studentfees : state.studentfeeReducer.studentfees,
  studentfee : state.studentfeeReducer.studentsinglefees
})
export default connect(mapStateToProps, {
  registerStudentfee,
  updateStudentfee,
  getAccounts,
  getFees,
  getStudentfeesSingle,
  setStudentfee
  
})(Studentclasss)
