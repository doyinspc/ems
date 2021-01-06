import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getInventorys, updateInventory, deleteInventory} from './../../../actions/setting/inventory';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import InventoryForm from'./../Form/Inventory'
import InventoryTable from'./../Table/Inventory'
import Header from './Header';


const Inventory = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET INVENTORYS PER SCHOOL
  useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id
      }),
      cat:'select',
      table:'inventorys',
      narration:'get inventorys'
      }
      props.getInventorys(params)
    }
    
  }, [props.user.activeschool])

  
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
    fd.append('table', 'inventorys');
    fd.append('narration', `activate ande disable inventory ${nu}`);
    props.updateInventory(fd);

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
 
  let data = props.inventorys.inventorys && Array.isArray(props.inventorys.inventorys) ? props.inventorys.inventorys.filter(rw =>rw !== null || rw !== undefined) : []
  
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
            <InventoryTable  
                sid={props.sid}
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
            <InventoryForm 
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
  inventorys : state.inventoryReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getInventorys,
  updateInventory,
  deleteInventory
})(Inventory)
