import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getNotices, updateNotice, deleteNotice} from './../../../actions/setting/notice';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import NoticeForm from'./../Form/Notice'
import NoticeTable from'./../Table/Notice'
import Header from './Header';


const Notice = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET NOTICES PER SCHOOL
  useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id
      }),
      cat:'selected',
      table:'notices',
      narration:'get notices'
      }
      props.getNotices(params)
    }
    
  }, [props.user.activeschool])

  
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
    fd.append('table', 'notices');
    fd.append('narration', `activate ande disable notice ${nu}`);
    props.updateNotice(fd);

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
 
  let data = props.notices.notices && Array.isArray(props.notices.notices) ? props.notices.notices.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <NoticeTable  
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
            <NoticeForm 
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
  notices : state.noticeReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getNotices,
  updateNotice,
  deleteNotice
})(Notice)
