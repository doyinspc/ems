import React from 'react'
import { connect } from 'react-redux';
import {getAccounts, getAccount, registerAccount, updateAccount, deleteAccount} from './../../../actions/setting/account';
import { useHistory} from 'react-router-dom'
import Loader from '../Loader';



const Account = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{row.abbrv}</td>
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
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-trash ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>:''}
              </tr>
  })
  return (
    <>
    {!props.accounts.isLoading ?
          <table className="table table-hover table-condensed table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Bank</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Account Number</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>:
            <Loader />}
  </>
         
  )
}
const mapStateToProps = (state) =>({
  accounts : state.accountReducer
})
export default connect(mapStateToProps, {
  getAccounts,
  getAccount,
  registerAccount,
  updateAccount,
  deleteAccount
})(Account)
