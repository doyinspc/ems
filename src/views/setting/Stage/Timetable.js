import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getTimetables, updateTimetable, deleteTimetable} from './../../../actions/setting/timetable';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import TimetableForm from'./../Form/Timetable'
import TimetableTable from'./../Table/Timetable'
import Header from './Header';


const Timetable = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET TIMETABLES PER SCHOOL
  useEffect(() => {
    if(props.activeschool !== undefined && props.activeschool.hasOwnProperty('id') && parseInt(props.activeschool))
    {
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.activeschool.id
      }),
      cat:'select',
      table:'timetables',
      narration:'get timetables'
        }
      props.getTimetables(params)
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
    fd.append('table', 'timetables');
    fd.append('narration', `activate ande disable timetable ${nu}`);
    props.updateTimetable(fd);

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
 
  let data = props.timetables.timetables && Array.isArray(props.timetables.timetables) ? props.timetables.timetables.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <TimetableTable  
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
            <TimetableForm 
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
  timetables : state.timetableReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getTimetables,
  updateTimetable,
  deleteTimetable
})(Timetable)
