import React from 'react'
import { connect } from 'react-redux';
import {getSchools, getSchool, registerSchool, updateSchool, deleteSchool} from './../../../actions/setting/school';
import { useHistory} from 'react-router-dom'
import {
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const School = (props) => {
  const history = useHistory()
 
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>
                  <CRow>
                    <CCol xs={2}>
                      <img
                        src={process.env.REACT_APP_SERVER_URL+ row.links}
                        height='auto'
                        width='100%'
                        onError={(e)=>{e.target.onerror=null; e.target.src='icons/slack.png'} }
                        className='img-fluid'
                      />
                    </CCol>
                    <CCol xs={10}>
                    <strong style={{color:row.color}}>{row.name}</strong>
                    <div className="small text-muted">{row.abbrv}</div>
                    <div className="small text-muted">{row.address}{" "}{row.states}{" "}{row.country}</div>
                    <span>Phone</span>: <strong><a href={`tel:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong><br/>
                    <span>Email</span>: <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> <br/>
                    <span>Signatory</span>: <strong>{row.signatoryname}</strong> <br/>
                    <button onClick={()=>props.onEdit(row)} className='btn btn-sm btn-link hidden-print'><i className='fa fa-edit'></i> Edit</button>
                    <button onClick={()=>props.onActivate(row.id, row.is_activate)} className='btn btn-sm btn-link hidden-print'><i className='fa fa-lock'></i> Lock</button>
                    <button onClick={()=>props.onDelete(row)} className='btn btn-sm btn-link hidden-print'><i className='fa fa-trash hidden-print'></i> Delete</button>
                    </CCol>
                    </CRow>
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
