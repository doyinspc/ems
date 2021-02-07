
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { searchStaff } from './../../actions/staff/staff'
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

  let dt0 = ''
  let dt1 = ''

  const changeSchool = (e) =>{
      setTerm(e.target.value)
  }

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
        table:'staffsearch',
        narration:`get all schools for access control`
      }
      props.searchStaff(params);
    }else{
      setClasz([])
    }
  }, [term, props.user.activeschool.id])


  let dat = clasz.map((props, index)=>{
    return <CListGroupItem key={index} target='_blank' className="m-0" href={`#/staffs/${props.id}`} active>
      <CRow>
        <CCol xs='2' className='m-0'>
            <img
               src={process.env.REACT_APP_SERVER_URL + props.photo} 
               style={{height:'40px', width:'40px'}}
               height="30px"
               alt="profile-image" 
               class="profile"
               onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/icons/profile_1.png'} }
               />
        </CCol>
        <CCol>
        <strong>{props.name}</strong><br/>
        <small>{props.employment_no}</small>
        </CCol>
      </CRow>
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
                    placeholder=' Staff search...'
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
  result:state.staffReducer.result,
  user : state.userReducer
})
export default connect(mapStateToProps, {searchStaff})(Dashboard)