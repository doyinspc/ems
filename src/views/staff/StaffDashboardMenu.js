import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { 
    CCard, 
    CCardBody, 
    CButton, 
    CButtonGroup, 
    CCardHeader, 
    CCol, 
    CRow, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem, 
    CDropdownDivider, 
    CContainer, 
    CCardFooter, 
    CForm,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CFormGroup,
    CInputGroupText,
    CSelect,
    CLabel
} from '@coreui/react';

import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom';


const Dashboard = (props) => {
  
  const [school, setSchool] = useState({})
  const [term, setTerm ] = useState({})
  //const [term, setTerm] = useState(0)
  const [clasz, setClasz] = useState(0)
  let dt = props.dropdowns && Array.isArray(props.dropdowns) && props.dropdowns.length == 4 ? props.dropdowns : [[], [], [], []];
  let dt0 ='';
  let dt1 ='';
  let dt2 ='';
  let dt3 ='';
  if(dt.length > 0)
  {
     dt0 = dt[0].map((prop, ind)=>{
    return <option key={ind}  value={prop.id}>{prop.name}</option>;
  });
    dt1 = dt[1].map((prop, ind)=>{
    return <option key={ind}  value={prop.id}>{prop.name}</option>;
  });
  dt2 = dt[2].map((prop, ind)=>{
    return <option key={ind}  value={prop.id}>{prop.name}</option>;
  });
  dt3 = dt[0].map((prop, ind)=>{
    return <option key={ind} value={JSON.stringify(prop)}>{prop.name}</option>;
  });
}

let sch  = props.schools.map((prop, ind)=>{
  return <option value={JSON.stringify(prop)}>{prop.name}</option>;
});

const changeSchool =() =>{
    props.changeSchool(JSON.parse(school))
}
const changeTerm =() =>{
  props.changeTerm(JSON.parse(term))
}
return (
    <>
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            
              <h4>Quick Menu</h4>
              
          </CCardHeader>
          <CCardBody>
            <CContainer>
            <CRow>
              <CCol>
              <CRow className='d-block'>
                <strong>Change</strong>
              </CRow>
              <CRow>
                <CCol xs='12' sm='12' md='6' >
                  <CForm>
                  <CFormGroup row>
                        <CInputGroup>
                          <CInputGroupPrepend>
                          <CInputGroupText>Change School</CInputGroupText>
                          </CInputGroupPrepend>
                          <CSelect 
                          id="input3-group2" 
                          name="input3-group2" 
                          placeholder="Search Staff"
                          onChange={(e)=>setSchool(e.target.value)}
                          >
                            {sch}
                            </CSelect>
                          <CInputGroupAppend>
                            <CButton  onClick={changeSchool} type="button" color="secondary"><i className='fa fa-thumbs-up'></i></CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol xs='12' sm='12' md='6'>
                <CForm>
                <CFormGroup row>
                      <CInputGroup>
                        <CInputGroupPrepend>
                        <CInputGroupText>Change Term</CInputGroupText>
                        </CInputGroupPrepend>
                        <CSelect  onChange={(e)=>setTerm(e.target.value)} id="input3-group2" name="input3-group2" placeholder="Search Staff" >
                          {dt3}
                          </CSelect>
                        <CInputGroupAppend>
                          <CButton  onClick={changeTerm}  type="button" color="secondary"><i className='fa fa-thumbs-up'></i></CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                  </CFormGroup>
                </CForm>
              </CCol>
              </CRow>
              </CCol>
            </CRow>
            <CRow>
            <CCol>
               <CRow className='d-block'>
                <strong>Navigate</strong>
              </CRow>
              <CForm action="" method="post" >
              <CRow xs={12} >
              <CCol xs='12' sm='12' md='12'  >
              <CRow>
              <CCol xs='12' sm='4' md='5' lg='5'  className="ml-0">
                <CFormGroup row>
                <CInputGroup>
                    <CInputGroupPrepend>
                    <CInputGroupText>Select Term</CInputGroupText>
                    </CInputGroupPrepend>
                  <CSelect 
                    custom 
                    size="md" 
                    name="term" 
                    id="term"
                    onChange={(e)=>setTerm(e.target.value)}
                    >
                      <option value="0">Select Term</option>
                      {dt0}
                    </CSelect>
                  </CInputGroup>
                </CFormGroup>
              </CCol>
              <CCol  xs='12' sm='4' md='5' lg='5' className="ml-0" >
                <CFormGroup row>
                <CInputGroup>
                    <CInputGroupPrepend>
                    <CInputGroupText>Select Class</CInputGroupText>
                    </CInputGroupPrepend>
                <CSelect 
                    custom 
                    size="md" 
                    name="clasz" 
                    id="clasz"
                    onChange={(e)=>setClasz(e.target.value)}
                    >
                      <option value="0">Select Class</option>
                      {dt1}
                    </CSelect>
                 </CInputGroup>
                </CFormGroup>
                </CCol>
              <CCol xs='12' sm='3' md='2' lg='2' className="ml-0" >
                <CFormGroup className="">
                <Link 
                    type="submit" 
                    className="btn btn-success btn-block btn-sm"
                    size="sm" 
                    color="primary"
                    to={`/studentclasses/${term}/${clasz}`}
                    >
                      <CIcon name="cil-scrubber" /> Load !</Link>
                </CFormGroup>
                </CCol>
              </CRow>
              </CCol>
              </CRow>
              </CForm>
            </CCol>
              </CRow>
              <CRow>
            <CCol>
               <CRow className='d-block'>
                <strong>Search</strong>
              </CRow>
              <CForm action="" method="post" >
              <CRow xs={12} >
              <CCol xs='12' sm='12' md='12'  >
              <CRow>
              <CCol xs='12' sm='4' md='4' lg='4'  className="ml-1">
                <CFormGroup row>
                <CInputGroup>
                    <CInputGroupPrepend>
                    <CInputGroupText>Select Term</CInputGroupText>
                    </CInputGroupPrepend>
                  <CSelect 
                    custom 
                    size="md" 
                    name="term" 
                    id="term"
                    onChange={(e)=>setTerm(e.target.value)}
                    >
                      <option value="0">Select Term</option>
                      {dt0}
                    </CSelect>
                  </CInputGroup>
                </CFormGroup>
              </CCol>
              <CCol  xs='12' sm='6' md='5' lg='5' className="ml-1" >
                <CFormGroup row>
                <CInputGroup>
                    <CInputGroupPrepend>
                    <CInputGroupText>Select for Staff</CInputGroupText>
                    </CInputGroupPrepend>
                <CSelect 
                    custom 
                    size="md" 
                    name="clasz" 
                    id="clasz"
                    onChange={(e)=>setClasz(e.target.value)}
                    >
                      <option value="0">Select Class</option>
                      {dt1}
                    </CSelect>
                    <CInputGroupAppend>
                        <CButton  onClick={changeSchool} type="button" color="secondary"><i className='fa fa-thumbs-up'></i></CButton>
                    </CInputGroupAppend>
                 </CInputGroup>
                </CFormGroup>
                </CCol>
              
              </CRow>
              </CCol>
              </CRow>
              </CForm>
            </CCol>
              </CRow>
            </CContainer>
          </CCardBody>
         </CCard>
      </CCol>
    </CRow>
    </>
  )
}
const mapStateToProps = (state) =>({

})
export default Dashboard