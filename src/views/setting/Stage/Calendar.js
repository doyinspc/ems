import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getSessions, getSession, deleteSession} from './../../../actions/setting/session';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import CalendarForm from'./../Form/Calendar'
import CalendarTable from'./../Table/Calendar'
import Header from './Header';


const Session = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
        let params = {
          data:JSON.stringify({
            'schoolid':props.user.activeschool.id
          }),
          cat:'select',
          table:'sessions',
          narration:'get sessions'
      }
        props.getSessions(params)
    }
    
  }, [props.user.activeschool])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }
 
  let data = props.sessions.sessions && Array.isArray(props.sessions.sessions) ? props.sessions.sessions.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <CalendarTable  
                data={data}
                editer={true}
                submenu={props.para.submenu}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <CalendarForm 
                id={id}
                school={props.school}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  sessions : state.sessionReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getSessions,
  deleteSession
})(Session)
