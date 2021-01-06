import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getMaintenanceunits, getMaintenanceunit, deleteMaintenanceunit} from './../../../actions/setting/maintenanceunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import MaintenanceunitForm from'./../Form/Maintenanceunit'
import MaintenanceunitTable from'./../Table/Maintenanceunit'
import Header from './Header';


const Maintenanceunit = (props) => {
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
            'maintenanceid':props.pid
        }),
        cat:'select',
        table:'maintenanceunits',
        narration:'get maintenanceunits'
  
    }
    props.getMaintenanceunits(params)
    
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

  //GET MAINTENANCE NAME
  let ses = props.maintenances.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.maintenanceunits.maintenanceunits && Array.isArray(props.maintenanceunits.maintenanceunits) ? props.maintenanceunits.maintenanceunits.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <MaintenanceunitTable  
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
            <MaintenanceunitForm 
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
  maintenanceunits : state.maintenanceunitReducer,
  maintenances : state.maintenanceReducer.maintenances,
})
export default connect(mapStateToProps, {
  getMaintenanceunits,
  deleteMaintenanceunit
})(Maintenanceunit)
