import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getClaszunits, getClaszunit, deleteClaszunit} from './../../../actions/setting/claszunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ClaszunitForm from'./../Form/Claszunit'
import ClaszunitTable from'./../Table/Claszunit'
import Header from './Header';


const Claszunit = (props) => {
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
            'claszid':props.pid
        }),
        cat:'select',
        table:'claszunits',
        narration:'get claszunits'
  
    }
    props.getClaszunits(params)
    
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
  let ses = props.claszs.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.claszunits.claszunits && Array.isArray(props.claszunits.claszunits) ? props.claszunits.claszunits.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <ClaszunitTable  
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
            <ClaszunitForm 
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
  claszunits : state.claszunitReducer,
  claszs : state.claszReducer.claszs,
})
export default connect(mapStateToProps, {
  getClaszunits,
  deleteClaszunit
})(Claszunit)
