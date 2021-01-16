import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getThemes, getTheme, deleteTheme} from './../../../actions/setting/theme';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ThemeForm from'./../Form/Theme'
import ThemeTable from'./../Table/Theme'
import Header from './Header';

const Theme = (props) => {
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
            'subjectid':props.pid
        }),
        cat:'selected',
        table:'themes',
        narration:'get themes'
  
    }
    props.getThemes(params)
    
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

  //GET SUBJECT NAME
  let ses = props.subjects.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
  let data = props.themes.themes && Array.isArray(props.themes.themes) ? props.themes.themes.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <ThemeTable  
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
            <ThemeForm 
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
  themes : state.themeReducer,
  subjects : state.subjectReducer.subjects,
})
export default connect(mapStateToProps, {
  getThemes,
  deleteTheme
})(Theme)
