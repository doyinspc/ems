import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getInventoryunits, getInventoryunit, deleteInventoryunit} from './../../../actions/setting/inventoryunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import InventoryunitForm from'./../Form/Inventoryunit'
import InventoryunitTable from'./../Table/Inventoryunit'
import Header from './Header';


const Inventoryunit = (props) => {
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
            'inventoryid':props.pid
        }),
        cat:'select',
        table:'inventoryunits',
        narration:'get inventoryunits'
  
    }
    props.getInventoryunits(params)
    
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

  //GET INVENTORY NAME
  let ses = props.inventorys.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
  let data = props.inventoryunits.inventoryunits && Array.isArray(props.inventoryunits.inventoryunits) ? props.inventoryunits.inventoryunits.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <InventoryunitTable  
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
            <InventoryunitForm 
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
  inventoryunits : state.inventoryunitReducer,
  inventorys : state.inventoryReducer.inventorys,
})
export default connect(mapStateToProps, {
  getInventoryunits,
  deleteInventoryunit
})(Inventoryunit)
