import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getUnits, getUnit, deleteUnit} from './../../../actions/setting/unit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import UnitForm from'./../Form/Unit'
import UnitTable from'./../Table/Unit'
import Header from './Header';


const Unit = (props) => {
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
            'departmentid':props.pid
        }),
        cat:'select',
        table:'units',
        narration:'get units'
  
    }
    props.getUnits(params)
    
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

  //GET DEPARTMENT NAME
  let ses = props.departments.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.units.units && Array.isArray(props.units.units) ? props.units.units.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <UnitTable  
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
            <UnitForm 
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
  units : state.unitReducer,
  departments : state.departmentReducer.departments,
})
export default connect(mapStateToProps, {
  getUnits,
  deleteUnit
})(Unit)
