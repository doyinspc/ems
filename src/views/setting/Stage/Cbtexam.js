import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getCbtexams, getCbtexam, deleteCbtexam} from './../../../actions/setting/cbtexam';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import CbtexamForm from'./../Form/Cbtexam'
import CbtexamTable from'./../Table/Cbtexam'
import Header from './Header';


const Cbtexam = (props) => {
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
            'cbtid':props.pid
        }),
        cat:'selected',
        table:'cbtexams',
        narration:'get cbtexams'
  
    }
    props.getCbtexams(params)
    
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

  //GET CLASZ NAME
  let ses = props.cbts.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.cbtexams.cbtexams && Array.isArray(props.cbtexams.cbtexams) ? props.cbtexams.cbtexams.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <CbtexamTable  
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
            <CbtexamForm 
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
  cbtexams : state.cbtexamReducer,
  cbts : state.cbtReducer.cbts,
})
export default connect(mapStateToProps, {
  getCbtexams,
  deleteCbtexam
})(Cbtexam)
