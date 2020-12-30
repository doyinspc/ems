import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
  CContainer,
} from '@coreui/react'
import { Link } from 'react-router-dom';
import Header from './Header';


const Term = (props) => {

 //GET SESSION NAME
 let ses = props.sessions.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
 let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'

 //GET SESSION NAME
 let tem = props.terms.filter(rw=>parseInt(rw.id) === parseInt(props.qid));
 let tems = tem && Array.isArray(tem) && tem.length > 0 ? tem[0].name : 'None'

  let dat = props.para.submenu && Array.isArray(props.para.submenu) ? props.para.submenu : [];
  let dat1 = dat && Array.isArray(dat) ? dat.filter(rw=>parseInt(rw.id) === 1) : [];
  let data = dat1[0].submenu && Array.isArray(dat1[0].submenu) ? dat1[0].submenu : [];
   
   return (
       <>
       <CCard>
       <Header 
              icon={dat1[0].icon}
              title={`${sess} ${tems} ${dat1[0].name}`} 
              school={props.school} 
              />
       </CCard>
       <CRow>
           {
               data.map((prop, index)=>{
                return <CCol sm="6" md="4"><Link key={index} to={`${prop.links}`} style={{color:'teal'}}>
                <CCard className='text-center' style={{backgroundColor:'purple', color:'white'}} >
                  <CCardBody className='text-center flex align-self-center justify-contents-center'>
                    <CContainer>
                    <CRow className='text-center' lg={12} style={{marginTop:'10px', marginBottom:'10px'}}>
                    <CCol>
                       <h5 style={{fontFamily:'Boogaloo'}}>{prop.name}</h5>
                    </CCol>
                    </CRow>
                    <CRow className='text-center flex align-self-center justify-contents-center' lg={12} style={{marginTop:'10px', marginBottom:'20px', textAlign:'center'}}>
                      <CCol>
                        <img
                          src={prop.icon}
                          height="100px"
                          style={{borderRadius:'50%'}}
                          />
                      </CCol>
                    </CRow>
                    <CCol>
                       <small style={{fontFamily:'Quicksand'}}>{prop.description}</small>
                    </CCol>
                   
                    </CContainer>
                  </CCardBody>
                </CCard>
                </Link> </CCol>

               })
           }
        </CRow>
        </>
  )
}
const mapStateToProps = (state) =>({
  terms : state.termReducer.terms,
  sessions : state.sessionReducer.sessions
})
export default connect(mapStateToProps, {
  
})(Term)
