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
    let studentid = props.studentid;
    let rows = props.studentname;
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
   console.log(student_classparent_subject_position_store);

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

    let data = props.data && Array.isArray(Object.keys(props.data)) ? props.data : []
  
    let acct = Object.keys(data).map((row, ind)=>{
      let subs= [];
      let adds = [];
      return <tr key={ind}>
      <td className="text-center">
       {ind + 1}
      </td>
      <td>
    <div><strong style={{textTransform:'capitalize'}}>{data[row]}</strong></div>
      </td>
      {
          
          Object.keys(ca_array).map((prop, ind)=>{
            let sumrow = [];
            let totrow = [];
            return <>{Object.keys(caunit_array[prop]).map((pro, inds)=>{
            if(arr && Array.isArray(Object.keys(arr)) && Object.keys(arr).includes(row) && Object.keys(arr[row]).includes(caunit_array[prop][pro].id) )
            {
              let sh = arr[row][caunit_array[prop][pro].id];
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
             <th className='text-center' >{Number(props.class_subject_average[row].average).toFixed(1)}</th>
             <th className='text-center' >{props.classparent_subject_average[row].average}</th>
             <th className='text-center' >{student_class_subject_position_store !== undefined && Array.isArray(Object.keys(student_class_subject_position_store))  && Object.keys(student_class_subject_position_store).includes(row) ? student_class_subject_position_store[row].position:'--'} </th>
             <th className='text-center' >{student_classparent_subject_position_store !== undefined && Array.isArray(Object.keys(student_classparent_subject_position_store))  && Object.keys(student_classparent_subject_position_store).includes(row) ? student_classparent_subject_position_store[row].position:'--'} </th>
             
             </>
             
         })
         
      }
      <th className='text-center' >{compute100(subs, adds)}</th>
      
    
    </tr>
  })
  
    
console.log(student_class_position_store);
  return (
   <>
   <CTabPane>
   <CRow className='mb-5'>
   <CCol xs={9}>
       <h3>{`${rows.surname} ${rows.firstname} ${rows.middlename}`}</h3>
       <h5>{rows.schoolabbrv}{rows.admission_no}</h5>
       <h6>{`${student_class_position_store.position} `}</h6>
       <h6>{`${student_class_position_store.average} `}</h6>
       <h6>{`${student_class_position_store.total} `}</h6>
       <h6>{`${student_class_position_store.subjects} `}</h6>
    </CCol>
    <CCol xs={3}>
    <div className="c-avata">
        <img 
        src={process.env.REACT_APP_SERVER_URL+ rows.photo} 
        className="c-" 
        style={{width:'120px'}}
        alt={rows.admission_no} 
        onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
        />
        <span className={`c-avatar-status ${rows.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
      </div>
    </CCol>

            <CCol>
                <table width="100%" border="solid 3px teal " style={{borderColor:'teal'}}>
                    <thead className="text-center">
                    <tr>
                            <th rowSpan={2}>SN</th><th rowSpan={2}>FULLNAME</th>{theadm}
                            <th rowSpan={2}>TOTAL<br/> (100%)</th>
                            <th rowSpan={2}>RANK</th>
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
        </CRow></CTabPane>
   </>
  )
}

export default StudentReportList
  
