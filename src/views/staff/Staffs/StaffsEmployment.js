import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from "moment";
import {
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Staffs = (props) => {
   const history = useHistory()
   let data = props.staffs && Array.isArray(props.staffs) ? props.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : []
   
   let tabl = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/studentclasss/${row.id}`)}>
    <td className="text-center">
      <div className="c-avatar">
      <img 
              src={process.env.REACT_APP_SERVER_URL+ row.photo}
              style={{width:'35px', height:'35px'}}
              height="35px" 
              width="35px" 
              className="c-avatar-img" 
              alt={row.employment_no} 
              onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL +'/avatars/1.png' }}
            />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td>
    <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
                <div className="small text-muted">
                <span><strong>{row.employment_no} </strong></span>
            </div>
    </td>
    <td>
    { moment(row.dob).format('DD MMMM, YYYY') !== 'Invalid date' ?
            <><div>{`${moment().diff(row.dob, 'years')} yrs`}</div>
                <div className="small text-muted">
                <strong><span>Date | {moment(row.dob).format('DD MMM, YYYY')}</span></strong>
           </div></>:"--"}
         
    </td>
    <td>
        { moment(row.doe).format('DD MMMM, YYYY') !== 'Invalid date' ?
            <><div>{`${moment().diff(row.doe, 'years')} yrs`}</div>
                <div className="small text-muted">
                <strong><span>Date | {moment(row.doe).format('DD MMM, YYYY')}</span></strong>
           </div></>:"--"}
    </td>
    <td>
      
      <strong style={{textTransform:'capitalize'}}>{row.departmentnames}</strong>
    </td>
    <td>
    <strong style={{textTransform:'capitalize'}}>{row.levelname}</strong>
    </td>
    <td>

    </td>
  </tr>
});
  
  return (
    <>
    <CRow>
      <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
              <tr>
              <th className="text-center">Staff ID</th>
                    <th>Fullname</th>
                    <th className="text-center">BIRTH DATE</th>
                    <th className="text-center">DATE EMPLOYED</th>
                    <th className="text-center">DEPARTMENT</th>
                    <th className="text-center">LEVEL</th>
                    <th className="text-center">JOB ROLES</th>
              </tr>
           </thead>
            <tbody>
                  {tabl}
            </tbody>
      </table>
    </CRow>
    </>
  )
}
export default Staffs
  
