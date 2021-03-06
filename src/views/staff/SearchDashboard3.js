
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { searchStudent } from './../../actions/student/student'
import {  
    CCol, 
    CRow,
    CFormGroup,
    CInput,
    CListGroup,
    CListGroupItem,
    CCard
    
} from '@coreui/react';

const Dashboard = (props) => {

  const [term, setTerm] = useState();
  const [clasz, setClasz] = useState([]);

  useEffect(() => {
    if(props.result !== undefined && Array.isArray(props.result))
    {
      setClasz(props.result)
    }else{
      setClasz([])
    }
  }, [props.result])

  useEffect(() => {
    if(term !== undefined && term.length > 2)
    {
      let params = {
        data:JSON.stringify(
        {
            'search':term,
            'schoolid': props.user.activeschool.id
        }),
        cat:'selected',
        table:'studentsearch',
        narration:`get all schools for access control`
      }
      props.searchStudent(params);
    }else{
      setClasz([])
    }
  }, [term, props.user.activeschool.id])


  let dat = clasz.map((prop, index)=>{
    return <CListGroupItem key={index} target='_blank' className="m-0"  onClick={()=>props.studentx(prop)} active>
      <CRow>
        <CCol xs='2' className='m-0'>
            <img
               src={process.env.REACT_APP_SERVER_URL + prop.photo} 
               style={{height:'40px', width:'40px'}}
               height="30px"
               alt="profile-image" 
               class="profile"
               onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/icons/profile_1.png'} }
               />
        </CCol>
        <CCol>
        <strong>{prop.name}</strong><br/>
        <small>{prop.admission_no}</small>
        </CCol>
      </CRow>
      </CListGroupItem>
  })
  
return (
    <>
              <CRow xs={12} >
                <CCol xs={12}>
                <CFormGroup >
                  <CInput
                    size="md"
                    className='w-100'
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)}
                    placeholder=' Search for students... Name or Admission number'
                    
                    />     
                </CFormGroup>
                <CCard className="mt-1" style={{display:'block', position:'absolute', zIndex:'101'}}>
                <CListGroup style={{width:'300px'}} onMouseLeave={()=>setClasz([])}>
                  {dat}
                 </CListGroup>
                </CCard>
                </CCol>
              </CRow>        
    </>
  )
}
const mapStateToProps = (state) =>({
  result:state.studentReducer.result,
  user : state.userReducer
})
export default connect(mapStateToProps, {searchStudent})(Dashboard)