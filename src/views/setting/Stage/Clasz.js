import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getClaszs, updateClasz, deleteClasz} from './../../../actions/setting/clasz';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ClaszForm from'./../Form/Clasz'
import ClaszTable from'./../Table/Clasz'
import Header from './Header';


const Clasz = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET CLASZS PER SCHOOL
  useEffect(() => {
    if(props.activeschool !== undefined && props.activeschool.hasOwnProperty('id') && parseInt(props.activeschool))
    {
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.activeschool.id
      }),
      cat:'select',
      table:'claszs',
      narration:'get claszs'
      }
      props.getClaszs(params)
    }
    
  }, [props.activeschool])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setCollapse(true);
  }
  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'claszs');
    fd.append('narration', `activate ande disable clasz ${nu}`);
    props.updateClasz(fd);

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
 
  let data = props.claszs.claszs && Array.isArray(props.claszs.claszs) ? props.claszs.claszs.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <ClaszTable  
                sid={props.sid}
                pid={props.pid}
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
        <CCollapse show={collapse}>
            <ClaszForm 
                id={id}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  claszs : state.claszReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getClaszs,
  updateClasz,
  deleteClasz
})(Clasz)
