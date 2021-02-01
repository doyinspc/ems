import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Staffs = (props) => {
   const history = useHistory()
   let data = props.staffs && Array.isArray(props.staffs) ? props.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : []
   let tabl = data.map((row, ind)=>{
    return <tr key={ind}>
    <td width="9%" className="text-center">
      <div className="c-avatar">
      <img 
          src={process.env.REACT_APP_SERVER_URL+ row.photo}
          style={{width:'50px', height:'50px'}}
          height="50px" 
          width="50px" 
          className="c-avatar-img" 
          alt={row.employment_no} 
          onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL +'/avatars/1.png' }}
        />
        <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </td>
    <td width="20%">
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
            <div className="small text-muted">
            <span>{row.employment_no} | {row.departmentname}</span>
        </div>
    </td>
    <td>
    
        <CContainer>
          <CRow>
            <CCol>
              <strong>{row.kin1_name} <i>{row.kin1_rel.length > 0  ?  '('+ row.kin1_rel +')' : '' }</i></strong><br/> <a href={`tel:${row.kin1_phone1}`}>{row.kin1_phone1}</a> <a href={`tel:${row.kin1_phone2}`}>{row.kin1_phone2}</a>  <a href={`mail:${row.kin1_email}`}>{row.kin1_email}</a><br/><i><span style={{textTransform:'uppercase'}}> {`${row.kin1_address} ${row.kin1_name}`}</span></i>
            </CCol>
            <CCol>
              <strong>{row.kin2_name} <i>{row.kin2_rel.length > 0  ?  '('+ row.kin2_rel +')' : '' }</i></strong><br/> <a href={`tel:${row.kin2_phone1}`}>{row.kin2_phone1}</a> <a href={`tel:${row.kin2_phone2}`}>{row.kin2_phone2}</a>  <a href={`mail:${row.kin2_email}`}>{row.kin2_email}</a><br/><i><span style={{textTransform:'uppercase'}}> {`${row.kin2_address} ${row.kin2_name}`}</span></i>
            </CCol>
          </CRow>

        </CContainer>
   
    </td>
  </tr>
});
   


 
  return (
    <>
    <CRow className='table-responsive'>
    <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Staff ID</th>
                    <th>Fullname</th>
                    <th className="text-center">Next of Kin</th>
                    
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
  
