import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import {getStaffexperiences  } from "./../../../actions/staff/staffexperience";
import { checkImage } from './../../../actions/common'


const Staffs = (props) => {

  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'staffid':props.datas
        }),
        cat:'selectess',
        table:'staffexperiences',
        narration:'get Staff experience'
    }
    props.getStaffexperiences(params)
  }, [props.datas])   

   let datar = props.staffs && Array.isArray(props.staffs) ? props.staffs.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : [];
   let data = props.staffexperience && Array.isArray(props.staffexperience) ? props.staffexperience.filter(rw=>rw!==null).filter(rw =>rw !== null || rw !== undefined) : []
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
        <td className='d-flex'>
        
            { 
                
                data && Array.isArray(data) && data.length > 0 ? data.filter(rw=>rw !==null && rw !== undefined && parseInt(rw.staffid) === parseInt(row.id)).map((prop, index)=>{
                        let imgx = process.env.REACT_APP_SERVER_URL + prop.links; 
                        return (
                            <tr key={index}> 
                                <CCol>
                                      <strong style={{textTransform:'uppercase'}}>{prop.organisation}</strong><br/>
                                        <i style={{textTransform:'capitalize'}}>{prop.position}</i><br/>
                                        {prop.job}<br/>
                                        {moment(prop.started).format('MMM DD, YYYY')}{" - "}{moment(prop.ended).format('MMM DD, YYYY')}
                                </CCol>
                            </tr>
                        )
                    }):<h4 className='text-center'>No Data</h4>
                }
       
        </td>
      </tr>
    });
  
  return (
    <>
    <CRow>
        <table className="table table-hover table-outline mb-0 d-sm-table">
          <thead className="thead-light">
            <tr>
              <th className="text-center">Staff ID</th>
              <th>Fullname</th>
              <th className="text-center">Experience</th>
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
  staffexperience:state.staffexperienceReducer.staffexperiences
})
export default connect(mapStateToProps,{getStaffexperiences})(Staffs)


