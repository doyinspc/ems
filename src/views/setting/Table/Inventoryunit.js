import React from 'react'
import { connect } from 'react-redux';
import {getInventoryunits, getInventoryunit, registerInventoryunit, updateInventoryunit, deleteInventoryunit} from './../../../actions/setting/inventoryunit';
import { useHistory} from 'react-router-dom'
import { inventorytypez } from '../../../actions/common';



const Inventoryunit = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      let na = inventorytypez.filter(rw=>rw.id == row.types);
      let nate = Array.isArray(na) && na.length > 0 ? na[0].name : '--';
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td>{row.units}</td>
                <td>{row.ranges}</td>
                <td>{nate}</td>
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
                    {
                        props.submenu.map((prp, ind)=>{
                            return <a  key={ind} title={prp.tag} onClick={(item) => history.push(`/setting/${props.sid}/${props.pid}/${row.id}`)}><i className='fa fa-list ml-2 px-2'></i></a>
                        })
                     }  
                    {props.editer === true ?
                     <>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onActivate(row.id, row.is_active)}><i className={`fa ${parseInt(row.is_active) == 1 ? 'fa-thumbs-down text-danger' : 'fa-thumbs-up text-success'} ml-2 px-2`}></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>:''}
              </tr>
  })
  return (

          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Items</th>
                    <th><i className='fa fa-list'></i> Unit</th>
                    <th><i className='fa fa-list'></i> Usage (Years/Percentage)</th>
                    <th><i className='fa fa-list'></i> Nature</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  inventoryunits : state.inventoryunitReducer
})
export default connect(mapStateToProps, {
  getInventoryunits,
  getInventoryunit,
  registerInventoryunit,
  updateInventoryunit,
  deleteInventoryunit
})(Inventoryunit)
