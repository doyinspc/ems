import React  from 'react'
import { useHistory} from 'react-router-dom'
import {
    CRow,
    CCol,
    CCardHeader,
    CNav,
    CNavLink,
    CNavItem,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CButton,
    CWidgetIcon,
    CCardFooter,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Studentclasss = (props) => {
   let history = useHistory()
   
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  
let tabl = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/studentclasss/${row.id}`)}>
    <td className="text-center">
      <div className="c-avatar">
        <img 
        src={process.env.REACT_APP_SERVER_URL+ '/passport/'+ row.photo1} 
        className="c-avatar-img" 
        alt={row.admission_no} 
        onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.png'} }
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td>
<div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
            <div className="small text-muted">
            <span>{row.schoolabbrv}{row.admission_no}</span>
        </div>
    </td>
    
    <td>
        <div className="small text-muted">
            <span>Date of Birth</span>: <strong>{row.dob}</strong>
        </div>
        <div className="small text-muted">
            <span>Date of Adm.</span>: <strong>{row.doe}</strong> 
        </div>
    </td>
    <td>
      <div className="small text-muted " style={{textTransform:'capitalize'}}>{row.soo}</div>
      <strong style={{textTransform:'capitalize'}}>{row.lga}</strong>
    </td>
    <td>
      <div className="text-muted " style={{textTransform:'capitalize'}}>{row.gender}</div>
    </td>
  </tr>
});

  return (
   <>
   <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Studentclass</th>
                    <th className="text-center">Contacts</th>
                    <th className="text-center">Dates</th>
                    <th>Origin</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                </tbody>
                </table>
   </>
  )
}

export default Studentclasss
  
