import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getCbts, updateCbt, deleteCbt} from './../../../actions/setting/cbt';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import CbtForm from'./../Form/Cbt'
import CbtTable from'./../Table/Cbt'
import Header from './Header';


const Cbt = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET CBTS PER SCHOOL
  useEffect(() => {
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
     let params = {
      data:JSON.stringify(
      {
          'is_active':0
      }),
      cat:'selected',
      table:'cbts',
      narration:'get cbts'
      }
      props.getCbts(params)
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
    fd.append('table', 'cbts');
    fd.append('narration', `activate ande disable cbt ${nu}`);
    props.updateCbt(fd);

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
 
  let data = props.cbts.cbts && Array.isArray(props.cbts.cbts) ? props.cbts.cbts.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <CbtTable  
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
            <CbtForm 
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
  cbts : state.cbtReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getCbts,
  updateCbt,
  deleteCbt
})(Cbt)
