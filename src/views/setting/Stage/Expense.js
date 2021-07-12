import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getExpenses, updateExpense, deleteExpense} from './../../../actions/setting/expense';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCollapse,
} from '@coreui/react'
import ExpenseForm from'./../Form/Expense'
import ExpenseTable from'./../Table/Expense'
import Header from './Header';


const Expense = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [id, setId] = useState('')
  const [dts, setDts] = useState({})
  const [parentid, setparentid] = useState(0)

  const toggle = () => {
    setCollapse(!collapse)
  }

  //GET EXPENSES PER SCHOOL
  useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
          'schoolid':props.user.activeschool.id
      }),
      cat:'select',
      table:'expenses',
      narration:'get expenses'
      }
      props.getExpenses(params)
    }
    
  }, [props.user.activeschool])

  
  const onEdit = (dt) =>{
      setDts(dt);
      setCollapse(true);
  }

  const onActivate = (rw, num) =>{
   
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'update');
    fd.append('table', 'expenses');
    fd.append('narration', `activate ande disable expense ${nu}`);
    props.updateExpense(fd);

  }

  const onDelete = (rw, dt) =>{
    
  }
  
  const onReset = () =>{
    setId(null);
    setDts({});
  }

  const onClose = () =>{
    setCollapse(false)
  }

  let titles = []
  let pid = parentid
  while (pid !== 0) {
    let nm_a = props.expenses.expenses.filter(rw=>parseInt(rw.id) === parseInt(pid))
    if(nm_a && Array.isArray(nm_a) && nm_a.length === 1)
    {
      let ar = {}
      ar.id = nm_a[0].parent_id
      ar.name = nm_a[0].name
      titles.push(ar);
      pid = parseInt(nm_a[0].parent_id) > 0 ?  nm_a[0].parent_id : 0;
    }else{
      pid = 0;
    }
  }
 
  let data = props.expenses.expenses && Array.isArray(props.expenses.expenses) ? props.expenses.expenses.filter(rw =>(rw !== null || rw !== undefined) && parseInt(rw.parent_id) === parseInt(parentid)) : []
 
   return (
    <CRow>
      <CCol >
        <CCard>
          <Header 
              icon={props.para.icon}
              title={props.para.name} 
              school={props.school} 
              toggle={toggle}
              />
         <CCardBody className='table-responsive'>
            <ExpenseTable  
                sid={props.sid}
                data={data}
                title={titles} 
                submenu={props.para.submenu}
                editer={true}
                setParent = {(id)=>setparentid(id)}
                onActivate={(rw, num)=>onActivate(rw, num)}
                onEdit={(rw)=>onEdit(rw)}
                onDelete={(rw)=>onDelete(rw)}
            />
          </CCardBody>
        </CCard>
        </CCol>
        <CCollapse show={collapse}>
            <ExpenseForm 
                id={id}
                sid={props.sid}
                parent={parentid}
                data={dts}
                onReset={onReset}
                onClose={onClose}
            />
        </CCollapse>
    </CRow>
  )
}
const mapStateToProps = (state) =>({
  expenses : state.expenseReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  getExpenses,
  updateExpense,
  deleteExpense
})(Expense)
