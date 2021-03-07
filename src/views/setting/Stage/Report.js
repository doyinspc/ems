import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getReports, getReport, updateReport, deleteReport} from './../../../actions/setting/report';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton
} from '@coreui/react'
import ReportForm from'./../Form/Report'
import ReportTable from'./../Table/Report'
import Header from './Header';


const Report = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [modal, setModal] = useState(true)
  const toggle = () => {
    setModal(!modal)
    setDts({})
  }

  //GET REPORTS PER SCHOOL
  useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id
      }),
      cat:'select',
      table:'reports',
      narration:'get reports'
      }
      props.getReports(params)
    }
    
  }, [props.user.activeschool])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setModal(true);
      props.getReport(dt.id)
  }

  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'reports');
    fd.append('narration', `activate ande disable report ${nu}`);
    props.updateReport(fd);

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
 
  let data = props.reports.reports && Array.isArray(props.reports.reports) ? props.reports.reports.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <ReportTable  
                data={data}
                title={props.para.name} 
                submenu={props.para.submenu}
                editer={true}
                onActivate={(rw, num)=>onActivate(rw, num)}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}  
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CModal 
              show={modal} 
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>Prepare Report Card</CModalTitle>
              </CModalHeader> 
              <CModalBody>
              <ReportForm 
                id={id}
                data={dts}
            />
              </CModalBody>
              <CModalFooter>
                
                <CButton 
                  color="secondary" 
                  onClick={() => setModal(false)}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>
        
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  reports : state.reportReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getReports,
  getReport,
  updateReport,
  deleteReport
})(Report)
