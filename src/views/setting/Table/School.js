import React from 'react'
import { connect } from 'react-redux';
import {getSchools, getSchool, registerSchool, updateSchool, deleteSchool} from './../../../actions/setting/school';
import { useHistory} from 'react-router-dom'
import {
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const School = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>
                    {row.name}
                    <div className="small text-muted">{row.abbrv}</div>
                </td>
                <td>
                <div className="small text-muted">
                    <span>Phone</span>: <strong><a href={`tel:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
                </div>
                <div className="small text-muted">
                    <span>Email</span>: <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
                </div>
                </td>
                <td className='text-center'>
                <div className="small text-muted">{row.address}</div>
                <div className="small text-muted"><strong>{row.states} | {row.country}</strong></div>
                 </td>
              { props.editer === true  && props.submenu.length > 0 ? <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    {
                      props.submenu.map((prp, ind)=>{
                        return <CDropdownItem onClick={(item) => history.push(`/${prp.page}/${row.id}`)}>{prp.name}</CDropdownItem>
                      })
                    }
                     {props.editer === true ?
                     <>
                      <CDropdownItem onClick={()=>props.onEdit(row)} >Edit</CDropdownItem>
                      <CDropdownItem onClick={()=>props.onDelete(row)}>Delete</CDropdownItem>
                    </>:""
                     }
                  </CDropdownMenu>
                </CDropdown>
                </td>:''}
              </tr>
  })
  return (

          <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> School</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Contact</th>
                    <th className="text-center"> <i className='fa fa-text'></i> Abbrv</th>
                    { props.editer === true  && props.submenu.length > 0 ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  schools : state.schoolReducer
})
export default connect(mapStateToProps, {
  getSchools,
  getSchool,
  registerSchool,
  updateSchool,
  deleteSchool
})(School)
