import { CCol, CRow, CCard, CCollapse, CCardBody, CCardHeader, CCardFooter,
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
    CButtonGroup, 
    CLink,
    CFade} from '@coreui/react'
    import CIcon from '@coreui/icons-react';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getStudentfees, registerStudentfee, updateStudentfee,  getStudentfeesSingle, deleteStudentfee, setStudentfee } from './../../actions/student/studentfee';
import moment from 'moment'
import Swal from 'sweetalert'
import { nairaformat } from '../../actions/common'

const FeesCard = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const [id, setId] = useState(null)
    const [datepaid, setDatepaid] = useState(new Date())
    const [amount, setAmount] = useState(0)
    const [accountid, setAccountid] = useState(null)
    const [feeid, setFeeid] = useState(null)
    const [staffid, setstaffid] = useState(null)
    const [teller, setTeller] = useState(null)
    

    const handleSubmitStudent = (id) =>{
        let fd = new FormData();
        fd.append('parentid', staffid);
        fd.append('id', id);
        fd.append('cat', 'updatestudentclasss');
        fd.append('table', 'accessstudentclass');
        fd.append('sessionid', props.sessionid);
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
            fd.append('sessionid', props.sessionid)
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
          return <><span ><strong>{nairaformat(diff)}</strong></span></>
        }else{
          return <span ><strong>{nairaformat(diff * -1)}</strong></span>
        }
      
      }
      const sumadds=(subzs)=>
      {
        let diff = subzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
          return <><span ><strong>{nairaformat(diff)}</strong></span></>
      }
      const setsDiff=(subzs, addzs)=>
      {
        let subz = subzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
        let addz = addzs.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0)
        let diff = subz - addz;
        return diff;
        
      
      }
      const setcolor = (amt, parent) =>{
           let backs = ''
           let fronts = ''
            if(parent == 1)
            {
                backs = 'secondary'
            }
            else{
                if(amt > 0 ){
                    backs = 'danger'
                    fronts = 'text-white'
                }else if(amt == 0 )
                {
                    backs = ''
                    fronts = ''
                }else{
                    backs = 'info'
                    fronts = 'text-white'
                }
            }

            return [backs, fronts]
      }
    let subs= [];
    let adds = [];
    let row = props.row;
    let datas = <CRow classID="m-0 p-0">
            <CCol className="m-0 p-0" sm={5} xs={12}>
            <table width='100%' className="text-left m-0 p-0" style={{fontSize:'11px'}}>
                <thead>
                    <tr className="bg-dark">
                        <th className="p-0">TERM</th>
                        <th className="p-0">FEE</th>
                        <th className="p-0">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                        { 
                            props.std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 1).map((p, i)=>{
                            subs.push(parseFloat(p.amount))
                            return <tr className="text-left m-0 p-0">
                            <td className="p-0">{p.termname}</td>
                            <td className="p-0"><span >{p.feename}</span></td>
                            <td className="p-0 text-right" ><strong>{nairaformat(p.amount)}</strong> 
                            {props.classteacher ? new Date() < new Date(new Date(p.date_created).setHours(new Date(p.date_created).getHours() + 4000)) && parseInt(row.parentid) === 0 ?  <span style={{cursor:'pointer'}}><CIcon name="cil-trash" onClick={()=>onDelete(p.id)} className="text-dark"/>{' '}</span>:'':''}
                            </td>
                            </tr>
                        })
                        }
                </tbody>
                <tfoot>
                    <tr className="bg-dark">
                        <th className="p-0">TERM</th>
                        <th className="p-0">FEE</th>
                        <th className="p-0">{sumadds(subs)}</th>
                    </tr>
                </tfoot>
            </table>
            </CCol>
            <CCol classID="m-0" sm={7} xs={12}>
            <table width='100%' className="text-left" style={{fontSize:'11px'}}>
            <thead>
                    <tr className="bg-dark">
                        <th className="p-0">TERM</th>
                        <th className="p-0">FEE</th>
                        <th className="p-0">DATE</th>
                        <th className="p-0">TELLER</th>
                        <th className="p-0">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                
                    {parseInt(row.parentid) === 0 ? "": <b><i>{'Recover from source'}<br/>{row.parentname}</i></b>}
                    
                    { 
                        props.std.filter(rw=>parseInt(rw.studentid) === parseInt(row.id) && parseInt(rw.grp) === 0).map((p, i)=>{
                        adds.push(parseFloat(p.amount))
                        return <tr className="text-left m-0 p-0">
                        <td className="p-0">{p.termname}</td>
                        <td className="p-0"><span >{p.feename}</span></td>
                        <td className="p-0"><span>{moment().format(p.datepaid, 'DD MM YYYY')}</span></td>
                        <td className="p-0"><i>{p.teller}</i></td>
                        <td className="p-0 text-right"><strong>{nairaformat(p.amount)}</strong> 
                        {props.classteacher ? new Date() < new Date(new Date(p.date_created).setHours(new Date(p.date_created).getHours() + 4000)) && parseInt(row.parentid) === 0 ?  <span style={{cursor:'pointer'}}><CIcon name="cil-trash" onClick={()=>onDelete(p.id)} className="text-dark"/>{' '}</span>:'':''}
                        </td>
                        </tr>
                
                    })
                    }
                    </tbody>
                <tfoot>
                    <tr className="bg-dark">
                        <th className="p-0">TERM</th>
                        <th className="p-0">FEE</th>
                        <th className="p-0">DATE</th>
                        <th className="p-0">TELLER</th>
                        <th className="p-0">{sumadds(adds)}</th>
                    </tr>
                </tfoot>
                    
                
                </table>
            </CCol>
        </CRow>

    return (
        <CCol xs="12" sm="12" md="12" className="m-0 p-0">
          
            <CCard className="m-0 p-0" color={setcolor(setsDiff(subs, adds), 0)[0]} className={setcolor(setsDiff(subs, adds), 0)[1]}>
              <CCardHeader>
                  <CRow className="m-0">
                      <CCol xs={8}>
                      <h5>{props.studentname}</h5>
                      </CCol>
                      <CCol xs={3}>
                        {setDiff(subs, adds)}
                      </CCol>
                      <CCol xs={1}>
                        <div className="card-header-actio">
                            <CLink className={setcolor(setsDiff(subs, adds), 0)[1]} onClick={() => setCollapsed(!collapsed)}>
                                <CIcon name={collapsed ? 'cil-chevron-top':'cil-chevron-bottom'} />
                            </CLink>
                        </div>
                    </CCol>
                  </CRow>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody classID="m-0 p-0">
                    {datas}
                </CCardBody>
                <CCardFooter>
                {props.classteacher ?
          <>
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
                        {props.fearray}
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
                        {props.acarray}
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
                        {props.fearray}
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
          </CDropdown>:''} 
          
          <CDropdown className="m-0">
              <CDropdownToggle color="dark" size='sm' >
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
                        {props.staffarray}
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
          </CButtonGroup>
            </>
   :''}

                </CCardFooter>
              </CCollapse>
            </CCard>
          
        </CCol>
    )
}

const mapStateToProps = (state) => ({
    user : state.userReducer,
    fees : state.feeReducer.fees,
    accounts : state.accountReducer.accounts,
    users : state.userReducer,
    staffs : state.staffReducer.staffall,
    studentfees : state.studentfeeReducer.studentfees,
    studentfee : state.studentfeeReducer.studentsinglefees
})

const mapDispatchToProps = {
  registerStudentfee,
  updateStudentfee,
  getStudentfeesSingle,
  setStudentfee,
  getStudentfees,
  deleteStudentfee
}

export default connect(mapStateToProps, mapDispatchToProps)(FeesCard)
