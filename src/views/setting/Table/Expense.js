import React from 'react'
import { connect } from 'react-redux';
import {getExpenses, getExpense, registerExpense, updateExpense, deleteExpense} from './../../../actions/setting/expense';
import { useHistory} from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem, CButton, CCol, CLink, CRow } from '@coreui/react';



const Expense = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = Array.isArray(data) ? data.filter(rw=>rw !== null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
                <td className='text-center'>{row.code}</td>
                <td className='text-center'>
                <button  onClick={()=>props.setParent(row.id)} className="btn btn-sm btn-success"><i className='fa fa-list text-light'></i> Subcategory</button>   
                </td>
                { props.editer === true  || (Array.isArray(props.submenu) && props.submenu.length > 0) ? 
                <td className='text-center'>
                  
                    {props.editer === true ?
                     <>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onActivate(row.id, row.is_active)}><i className={`fa ${parseInt(row.is_active) == 1 ? 'fa-thumbs-down text-danger' : 'fa-thumbs-up text-success'} ml-2 px-2`}></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>:''}
              </tr>
  }):''
  return (
    <>
    <CRow>
      <CCol>
      <CBreadcrumb>
        {
          props.title.map((prop, index)=>{
            return <CBreadcrumbItem key={index}>
                  <CLink onClick={()=>props.setParent(prop.id)}>{prop.name}</CLink>
                </CBreadcrumbItem>
          })
        }
      </CBreadcrumb>
      </CCol>
    </CRow>
          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Expense</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Code</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Subcategories</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
      </>   
  )
}
const mapStateToProps = (state) =>({
  expenses : state.expenseReducer
})
export default connect(mapStateToProps, {
  getExpenses,
  getExpense,
  registerExpense,
  updateExpense,
  deleteExpense
})(Expense)
