import React, { useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import { getStaffstudents, updateStaffstudent, registerStaffstudent, deleteStaffstudent} from './../../../actions/staff/staffstudent'
import CIcon from '@coreui/icons-react'
import SearchDashboard3 from '../SearchDashboard3'
import { connect } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import Swal from'sweetalert'
import { deleteStaffclass } from '../../../actions/staff/staffclass'



const Studentclasss = (props) => {
  let history = useHistory()
  let data = props.staffstudents.staffstudents && Array.isArray(props.staffstudents.staffstudents) ? props.staffstudents.staffstudents.filter(rw =>rw !== null || rw !== undefined) : []
  let clientid = props.clientid;
  let termid = props.termid;
  let sessionid = props.sessionid;
  let subjectid = props.subjectid;
  let subject = props.subject;
  let groupid = 3;

 
  useEffect(() => {
    if(parseInt(subjectid) > 0 ){
     let params = {
        data:JSON.stringify(
        {
            'termid':termid,
            'itemid':subjectid,
            'sessionid':sessionid,
            'itemid1':clientid,
            'grp':groupid
        }),
        cat:'staffclass',
        table:'accessstudentsubject',
        narration:'get staff student subjects'
  
      }
      props.getStaffstudents(params)
    }
  }, [termid,subjectid, sessionid, groupid, clientid])

const loadStudent = (studentid) =>{
    let fd = new FormData();
      fd.append('itemid', subjectid);
      fd.append('itemid1', clientid);
      fd.append('clientid', studentid.id);
      fd.append('checker', groupid+'_'+termid+'_'+studentid.id+'_'+subjectid);
      fd.append('table', 'accessstudentsubject');
      fd.append('sessionid', sessionid);
     
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerStaffstudent(fd)
      
}

const onRemove =(id)=>{
     Swal("Are you sure you want to delete you will not be able to restore the data.")
    .then((value) => {
      if(value == true && parseInt(id) > 0){
          let fd = new FormData();
          fd.append('id', id);
          fd.append('sessionid', sessionid)
          fd.append('table', 'accessstudentsubject')
          fd.append('cat', 'deletes')
          props.deleteStaffstudent(fd, id);
      }else{
        Swal(`Not deleted`);
      }
      
    });
  
}

let tabl = data.filter(rw=>rw !== null && rw !== undefined).map((row, ind)=>{
    return <tr key={ind}
    >
    <td className="text-center" width='60px'>
      <span>{row.admission_no}</span>
    </td>
    <td width='340px' valign='middle' className='container'>
         {`${row.admission_no}`}
    </td>
    <td >
      <span className='pull-right'>
      <button  onClick={()=>onRemove(row.id)} className='btn btn-sm btn-round btn-danger '><CIcon  size='lg' name="cil-x"/></button>
      </span>
    </td>
  </tr>
});
  return (
   <>
   <CCard>
     <CCardHeader>
       <CContainer>
         <CRow>
           <CCol>
              <h4>{subject.itemname1}{" "}{subject.itemname}</h4>
            </CCol>
            <CCol xs={2}>
            <button  
                onClick={()=>props.goBack()}
                className="btn btn-info"><i className='fa fa-backward'></i></button>
            </CCol>
         </CRow>
      </CContainer>
   </CCardHeader>
   <CCardBody className='table-responsive'>
   <table className="table table-bordered mb-0  d-sm-table">
        <thead className="thead-light">
            <tr>
            <th className="text-center"><CIcon name="cil-people" /></th>
            <th>Students</th>
            <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {tabl}
        </tbody>
  </table>
  </CCardBody>
  </CCard>
   </>
  )
}
const mapStatetoProps = (state)=>({
 staffstudents:state.staffstudentReducer
})
export default connect(mapStatetoProps, {
    getStaffstudents,
    updateStaffstudent,
    registerStaffstudent,
    deleteStaffstudent
}) (Studentclasss)
  
