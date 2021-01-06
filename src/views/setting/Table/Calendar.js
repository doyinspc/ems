import React from 'react'
import { connect } from 'react-redux';
import  moment from 'moment';
import {getSessions, getSession, registerSession, updateSession, deleteSession} from './../../../actions/setting/session';
import { useHistory} from 'react-router-dom'
import {
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Session = (props) => {
  const history = useHistory()
  console.log(props)
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>{moment(row.started).format('MMM D, YYYY')}</td>
                <td className='text-center'>{moment(row.ended).format('MMM D, YYYY')}</td>
                
              { props.editer === true  || props.submenu.length > 0 ? 
              <td className='text-center'>
                <CDropdown className="m-0 btn-group ">
                  <CDropdownToggle color="success" size="sm">
                  <i className='fa fa-gear'></i> Action
                  </CDropdownToggle>
                  <CDropdownMenu>
                    {
                      props.submenu.map((prp, ind)=>{
                        let addr = prp.links+row.id+'/0/0/0/0';
                       return <CDropdownItem key={ind} onClick={(item) => history.push(addr)}>{prp.name}</CDropdownItem>
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
                <thead className="thead-lighst" style={{backgroundColor:'navy', color:'white'}}>
                  <tr>
                  <th className="text-center">SN.</th>
                    <th><i className='fa fa-list'></i> Session</th>
                    <th className="text-center"> <i className='fa fa-calendar'></i> Start</th>
                    <th className="text-center"><i className='fa fa-calendar'></i> End</th>
                    { props.editer === true  ||  props.submenu.length > 0 ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  sessions : state.sessionReducer
})
export default connect(mapStateToProps, {
  getSessions,
  getSession,
  registerSession,
  updateSession,
  deleteSession
})(Session)
