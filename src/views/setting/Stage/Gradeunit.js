import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getGradeunits, getGradeunit, deleteGradeunit} from './../../../actions/setting/gradeunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import GradeunitForm from'./../Form/Gradeunit'
import GradeunitTable from'./../Table/Gradeunit'
import Header from './Header';


const Gradeunit = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'gradeid':props.pid
        }),
        cat:'select',
        table:'gradeunits',
        narration:'get gradeunits'
  
    }
    props.getGradeunits(params)
    
  }, [props.pid])

  
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

  //GET GRADE NAME
  let ses = props.grades.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.gradeunits.gradeunits && Array.isArray(props.gradeunits.gradeunits) ? props.gradeunits.gradeunits.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              icon={props.para.icon}
              title={sess} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <GradeunitTable  
                pid={props.pid}
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
            <GradeunitForm 
                pid={props.pid}
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
  gradeunits : state.gradeunitReducer,
  grades : state.gradeReducer.grades,
})
export default connect(mapStateToProps, {
  getGradeunits,
  deleteGradeunit
})(Gradeunit)
