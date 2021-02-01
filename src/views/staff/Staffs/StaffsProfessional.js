import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import {getStaffprofessionals  } from "./../../../actions/staff/staffprofessional";
import { checkImage } from './../../../actions/common'


const Staffs = (props) => {
  const [ids, setids] = useState(0)
  useEffect(() => {
    if(ids == 1){
    let params = {
        data:JSON.stringify(
        {
            'staffid':props.datas
        }),
        cat:'selectess',
        table:'staffprofessionals',
        narration:'get Staff professional'
    }
    props.getStaffprofessionals(params)
  }
  }, [props.datas, ids])   

   let datar = props.staffs && Array.isArray(props.staffs) ? props.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : [];
   let data = props.staffprofessional && Array.isArray(props.staffprofessional) ? props.staffprofessional.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : []
   let tabl = datar.map((row, ind)=>{
        return <tr key={ind}>
        <td width="5%" className="text-center">
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
        <td >
          <CContainer fluid>
        <CRow xs={12}>
          <ul>
            { 
                
                data && Array.isArray(data) && data.length > 0 ? data.filter(rw=>rw !==null && rw !== undefined && parseInt(rw.staffid) === parseInt(row.id)).map((prop, index)=>{
                        let imgx = process.env.REACT_APP_SERVER_URL + prop.links; 
                        return (
                          <a target='_blank' className='' href={imgx}><li key={index} className="my-0 py-0" style={{marginTop:'0px', marginBottom:'0px', lineHeight:'normal'}} xs={12} sm={12}>
                                      {prop.level}{" "} <strong style={{textTransform:'uppercase'}}>{prop.instituition}</strong>{" "}
                                      {moment(prop.issued).format('MMM DD, YYYY')} {" "}
                                      
                                 </li></a>
                           
                        )
                    }):<h4 className='text-center'>No Data</h4>
                }
                </ul>
       </CRow>
       </CContainer>
        </td>
      </tr>
    });
  
  return (
    <>
    <CRow>
        <table className="table table-hover table-outline mb-0">
          <thead className="thead-light">
            <tr>
              <th className="text-center">Staff ID </th>
              <th onClick={()=>setids(1)}>Fullnameon <CIcon name="cil-cloud-download"/> </th>
              <th className="text-center">Professional</th>
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

const mapStateToProps = (state) =>({
  staffprofessional:state.staffprofessionalReducer.staffprofessionals
})
export default connect(mapStateToProps,{getStaffprofessionals})(Staffs)


