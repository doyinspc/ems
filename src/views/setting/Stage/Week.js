import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getWeeks, updateWeek, deleteWeek} from './../../../actions/setting/week';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import WeekForm from'./../Form/Week'
import WeekTable from'./../Table/Week'
import Header from './Header';


const Week = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET WEEKS PER SCHOOL
  useEffect(() => {
     let params = {
      data:JSON.stringify(
      {
          'termid':props.sid
      }),
      cat:'selected',
      table:'weeks',
      narration:'get weeks'
      }
      props.getWeeks(params)
    
    
  }, [props.sid])

  
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
    fd.append('table', 'weeks');
    fd.append('narration', `activate ande disable week ${nu}`);
    props.updateWeek(fd);

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
 
   //GET TERM NAME
   let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
   let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
   let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
   let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'
 
  let data = props.weeks.weeks && Array.isArray(props.weeks.weeks) ? props.weeks.weeks.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              title={sess +" "+tems+" Term : "}
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <WeekTable  
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
            <WeekForm 
                id={id}
                sid={props.sid}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  weeks : state.weekReducer,
  user:state.userReducer,
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions,
})
export default connect(mapStateToProps, {
  getWeeks,
  updateWeek,
  deleteWeek
})(Week)
