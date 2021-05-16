import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getClassfees, getClassfee, deleteClassfee, updateClassfee, insertClassfee} from './../../../actions/setting/classfee';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CSelect,
  CButton,
  CFormGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
  CContainer,
} from '@coreui/react'
import Header from './Header';


const Classfee = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [otermid, setotermid] = useState()
  
  const toggle = () => {
    setCollapse(!collapse)
  }
  
  
  const loads1 = ()=>{
        let ses = props.terms.filter(rw=>parseInt(rw.id) === parseInt(otermid));
        let osessionid = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].sessionid : 0;
        console.log(props.pid, props.qid, osessionid, otermid);
        if(parseInt(props.pid) > 0 && parseInt(osessionid) > 0 && parseInt(props.qid) > 0 && parseInt(otermid) > 0 )
        {
            let fd = new FormData();

            fd.append('sessionid', props.pid);
            fd.append('osessionid', osessionid);
            fd.append('termid', props.qid);
            fd.append('otermid', otermid);
            fd.append('cat', 'duplicateclassstudent');
            fd.append('table', 'tabs' );

            props.insertClassfee(fd);
        }
  }

  const loads2 = ()=>{
    let ses = props.terms.filter(rw=>parseInt(rw.id) === parseInt(otermid));
    let osessionid = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].sessionid : 0;
  
    if(parseInt(props.pid) > 0 && parseInt(osessionid) > 0 && parseInt(props.qid) > 0 && parseInt(otermid) > 0 )
    {
        let fd = new FormData();

        fd.append('sessionid', props.pid);
        fd.append('osessionid', osessionid);
        fd.append('termid', props.qid);
        fd.append('otermid', otermid);
        fd.append('cat', 'duplicateclassstaff');
        fd.append('table', 'tabs' );

        props.insertClassfee(fd);
    }
}

const loads3 = ()=>{
    let ses = props.terms.filter(rw=>parseInt(rw.id) === parseInt(otermid));
    let osessionid = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].sessionid : 0;
  
    if(parseInt(props.pid) > 0 && parseInt(osessionid) > 0 && parseInt(props.qid) > 0 && parseInt(otermid) > 0 )
    {
        let fd = new FormData();

        fd.append('sessionid', props.pid);
        fd.append('osessionid', osessionid);
        fd.append('termid', props.qid);
        fd.append('otermid', otermid);
        fd.append('cat', 'duplicateclassstudentsubject');
        fd.append('table', 'tabs' );

        props.insertClassfee(fd);
    }
}

const loads4 = ()=>{
    let ses = props.terms.filter(rw=>parseInt(rw.id) === parseInt(otermid));
    let osessionid = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].sessionid : 0;
  
    if(parseInt(props.pid) > 0 && parseInt(osessionid) > 0 && parseInt(props.qid) > 0 && parseInt(otermid) > 0 )
    {
        let fd = new FormData();

        fd.append('sessionid', props.pid);
        fd.append('osessionid', osessionid);
        fd.append('termid', props.qid);
        fd.append('otermid', otermid);
        fd.append('cat', 'duplicateclassstaffsubject');
        fd.append('table', 'tabs' );

        props.insertClassfee(fd);
    }
}


  
  //GET TERM NAME
  let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

  let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
  let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'

  let dt = props.dropdowns && Array.isArray(props.dropdowns) && props.dropdowns.length > 4 ? props.dropdowns : [[], [], [], []];
  let dt0 ='';
  if(dt.length > 0)
  {
     dt0 = dt[0].map((prop, ind)=>{
    return <option key={ind}  value={prop.termid}>{prop.name}</option>;
    }); 
  }

  let data = props.classfees.classfees && Array.isArray(props.classfees.classfees) ? props.classfees.classfees.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              qid={props.qid}
              did={props.did}
              icon={props.para.icon}
              title={sess +" "+tems+" Term : Quick Setup"} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
             <table width="100%">
                 <tbody>
                     <tr>
                         <td></td>
                         <td>Student Class</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={()=>loads1()} block >Load</CButton></td>
                     </tr>
                     <tr>
                         <td></td>
                         <td>Staff Class</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads2} block >Load</CButton></td>
                     </tr>
                     <tr>
                         <td></td>
                         <td>Student Subjects</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads3} block >Load</CButton></td>
                     </tr>
                     <tr>
                         <td></td>
                         <td>Staff Subjects</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads4} block >Load</CButton></td>
                       </tr>
                     <tr>
                         <td></td>
                         <td>Academics</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads1} block >Load</CButton></td>
                     </tr>
                     <tr>
                         <td></td>
                         <td>Behavior</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads1} block >Load</CButton></td>
                      </tr>
                     <tr>
                         <td></td>
                         <td>Skills</td>
                         <td>
                             <CContainer  className='m-0 p-0'>
                                 <CRow><CCol>
                            <CFormGroup row className='m-0 p-0'>
                                <CInputGroup size="sm">
                                    <CInputGroupPrepend size="sm">
                                    <CInputGroupText size="sm">Copy data from</CInputGroupText>
                                    </CInputGroupPrepend>
                                <CSelect 
                                    custom 
                                    size="sm" 
                                    name="term" 
                                    id="term"
                                    onChange={(e)=>setotermid(e.target.value)}
                                    >
                                    <option value="0">Select Term</option>
                                    {dt0}
                                </CSelect>
                                </CInputGroup>
                            </CFormGroup>
                            </CCol></CRow>
                            </CContainer>
                         </td>
                         <td>
                             <CButton className='m-0' size='sm' color='secondary' onClick={loads1} block >Load</CButton></td>
                     </tr>
                 </tbody>
             </table>

            
          </CCardBody>
        </CCard>
        </CCol>
        
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  classfees : state.classfeeReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
  dropdowns: state.userReducer.dropdowns
})
export default connect(mapStateToProps, {
  getClassfees,
  deleteClassfee,
  updateClassfee,
  insertClassfee
})(Classfee)
