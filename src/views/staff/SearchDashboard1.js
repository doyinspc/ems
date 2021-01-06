
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
            'search':term
        }),
        cat:'selected',
        table:'studentsearch',
        narration:`get all schools for access control`
      }
      props.searchStudent(params);
    }else{
      setClasz([])
    }
  }, [term])


  let dat = clasz.map((props, index)=>{
    return <CListGroupItem key={index} href={`/students/${props.id}`} active>
        <strong>{props.name}</strong><br/>
        <small>{props.admission_no}</small>
      </CListGroupItem>
  })
  

return (
    <>
              <CRow xs={12} >
                <CCol>
                <CFormGroup row>
                  <CInput
                    size="md"
                    className='w-100'
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)}
                    placeholder=' Student search...'
                    />     
                </CFormGroup>
                <CCard className="mt-0" style={{display:'block', position:'absolute', zIndex:'101'}}>
                <CListGroup style={{width:'300px'}}>
                  {dat}
                 </CListGroup>
                </CCard>
                </CCol>
              </CRow>
             
             
              
    </>
  )
}
const mapStateToProps = (state) =>({
  result:state.studentReducer.result
})
export default connect(mapStateToProps, {searchStudent})(Dashboard)