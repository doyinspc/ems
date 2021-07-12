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
import { Link, Redirect } from 'react-router-dom';
import { controls } from '../../actions/common';
import {getExpenses, getExpense} from './../../actions/setting/expense'

const Term = (props) => {

  const [activeid, setactiveid] = useState(0)
  useEffect(() => {
    let params = {
      data:JSON.stringify(
      {
          'is_active':0
      }),
      cat:'selected',
      table:'expenses',
      narration:'expense'
    }
    props.getExpenses(params);
    
    }, [])

    loadExpense = (id) =>{
      setactiveid(id)
      props.getExpense(id)
    }

   let data = controls[4].data;
   let expenses = props.expenses.expenses.filter(rw=>parseInt(rw.parent_id) === 0)
   
   return (
       <>
       {activeid > 0 ? <Redirect to='/expenses_capital'/> :''}
        <CRow>
           {
               expenses.map((prop, index)=>{
                return <CCol sm="6" md="3">
                <Link key={index} onClick={()=>loadExpense(prop.id)} style={{color:'teal'}}>
                <CCard className='text-center' style={{backgroundColor:'#2f4454', color:'white'}} >
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
                          src={process.env.PUBLIC_URL +  '/icons/bank.png'}
                          height="100px"
                          style={{borderRadius:'50%'}}
                        />
                      </CCol>
                    </CRow>
                    <CCol>
                       <small style={{fontFamily:'Quicksand'}}>{prop.abbrv}</small>
                    </CCol>
                   
                    </CContainer>
                  </CCardBody>
                </CCard>
                </Link> </CCol>

               })
           }
        </CRow>
       
       <CRow>
           {
               data.map((prop, index)=>{
                return <CCol sm="6" md="3"><Link key={index} to={prop.links} style={{color:'teal'}}>
                <CCard className='text-center' style={{backgroundColor:'#2f4454', color:'white'}} >
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
                          src={process.env.PUBLIC_URL +  prop.icon}
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
  user: state.userReducer,
  sessions : state.sessionReducer.sessions,
  expenses : state.expenseReducer
})
export default connect(mapStateToProps, {getExpenses, getExpense})(Term)
