import React, { useState, useEffect }  from 'react'
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

const StudentReportList = (props) => {
    let subjectid = props.subjectid;
    let subjectname = props.subjectname;
    let theadm = props.theadm;
    let theadm1 = props.theadm1;
    let caunit_array = props.caunit_array;
    let ca_array = props.ca_array;
    let arr = props.arr
    let classparent_subject_average = props.classparent_subject_average
    let class_subject_average = props.class_subject_average
    let student_classparent_subject_position_store = props.student_classparent_subject_position_store
    let student_class_subject_position_store = props.student_class_subject_position_store
    let student_classparent_position_store = props.student_classparent_position_store
    let student_class_position_store = props.student_class_position_store


    const compute = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 10 : 0;
        return Number(res).toFixed(1)
    }
    const compute100 = (sumz, totz)=>{
        let sums = sumz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        let tots = totz.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        
        let res = sums > 0 && tots > 0 ? (sums/tots) * 100 : 0;
        return Number(res).toFixed(1)
    }

    let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
  
    let acct = data.map((row, ind)=>{
      let subs= [];
      let adds = [];
      return <tr key={ind}>
      <td className="text-center">
       {ind + 1}
      
      </td>
      <td>
      <div><strong>{`${row.surname} ${row.firstname} ${row.middlename}`}</strong></div>
      </td>
      {
          Object.keys(ca_array).map((prop, ind)=>{
            let sumrow = [];
            let totrow = [];
            return <>{Object.keys(caunit_array[prop]).map((pro, inds)=>{
            if(Object.keys(arr).includes(row.id) && Object.keys(arr[row.id]).includes(caunit_array[prop][pro].id) )
            {
              let sh = arr[row.id][caunit_array[prop][pro].id];
              let shmax = caunit_array[prop][pro].score;
              sumrow.push(sh)
              totrow.push(shmax)
              subs.push(sh)
              adds.push(shmax)
              return <td className='text-center' key={inds}>{Number(sh).toFixed(1)}</td>
            }else
            {
              return <td className='text-danger text-center'><CIcon name="cil-x"/></td>
            }
             })}
             <th className='text-center' >{compute(sumrow, totrow)}</th>
             </>
         })
         
      }
      <th className='text-center' >{compute100(subs, adds)}</th>

      <th className='text-center' >{Object.keys(student_class_subject_position_store).includes(row.id) && Object.keys(student_class_subject_position_store[row.id]).includes(subjectid)? student_class_subject_position_store[row.id][subjectid].position: "--"} of {Object.keys(student_class_subject_position_store).length} </th>
      <th className='text-center' >{Object.keys(student_classparent_subject_position_store).includes(row.id) && Object.keys(student_classparent_subject_position_store[row.id]).includes(subjectid)?student_classparent_subject_position_store[row.id][subjectid].position:'--'} of {Object.keys(student_classparent_subject_position_store).length}</th>
      
    </tr>
  })
  
    

  return (
   <>
    <CTabPane>
         <CRow className='mb-5'>
   <CCol xs={12}>
       <h3>{subjectname}</h3>
       <h5>Class Arm Subject Average : {Number(class_subject_average.average).toFixed(1)}</h5>
       <h5>Class Arm Population : {Number(class_subject_average.pop).toFixed(0)}</h5>
       <h5>Class Subject Average : {Number(classparent_subject_average.average).toFixed(1)}</h5>
       <h5>Class Population : {Number(classparent_subject_average.pop).toFixed(0)}</h5>
  </CCol>

            <CCol>
                <table width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                    <thead className="text-center">
                    <tr>
                            <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>{theadm}
                            <th rowSpan={2}>TOTAL<br/> (100%)</th>
                            <th rowSpan={2}>RANK<br/> ARM</th>
                            <th rowSpan={2}>RANK<br/> CLASS</th>
                        </tr>
                        <tr>
                            {theadm1}
                            
                        </tr>
                    </thead>
                    {
                        acct
                    }
                </table>
            </CCol>
        </CRow>
    </CTabPane>
   </>
  )
}

export default StudentReportList
  
