import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getExpenseunits, getExpenseunit, deleteExpenseunit} from './../../../actions/setting/expenseunit';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ExpenseunitForm from'./../Form/Expenseunit'
import ExpenseunitTable from'./../Table/Expenseunit'
import Header from './Header';


const Expenseunit = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})

  const toggle = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'expenseid':props.pid
        }),
        cat:'select',
        table:'expenseunits',
        narration:'get expenseunits'
  
    }
    props.getExpenseunits(params)
    
  }, [props.pid])

  
  const onEdit = (dt) =>{
      setId(dt.id);
      setDts(dt);
      setCollapse(true)
  }
  const onDelete = (rw, dt) =>{
    
  }
  
  const onReset = () =>{
    setId(null);
    setDts({});
  }
  const onClose = (rw, dt) =>{
    setCollapse(false)
  }

  //GET EXPENSE NAME
  let ses = props.expenses.filter(rw=>parseInt(rw.id) === parseInt(props.pid));
  let sess = ses && Array.isArray(ses) && ses.length > 0 ? ses[0].name : 'None'
 
  let data = props.expenseunits.expenseunits && Array.isArray(props.expenseunits.expenseunits) ? props.expenseunits.expenseunits.filter(rw =>rw !== null || rw !== undefined) : []
  
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              pid={props.pid}
              icon={props.para.icon}
              title={sess} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <ExpenseunitTable  
                pid={props.pid}
                data={data}
                editer={true}
                submenu={props.para.submenu}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <ExpenseunitForm 
                pid={props.pid}
                id={id}
                school={props.school}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  expenseunits : state.expenseunitReducer,
  expenses : state.expenseReducer.expenses,
})
export default connect(mapStateToProps, {
  getExpenseunits,
  deleteExpenseunit
})(Expenseunit)
