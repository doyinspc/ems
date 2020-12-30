import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

import {  
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CButton,
    CInputCheckbox,
    CInputRadio,
    CCollapse
 } from '@coreui/react';
import { getStaffaccesss, deleteStaffaccess } from './../../actions/staff/staffaccess';
import { getSchools } from './../../actions/setting/school';
import { getDepartments } from './../../actions/setting/department';
import { controls } from '../../actions/common';


const StaffAccess = (props, {match}) => {
  const staffid = props.sid
  const usercontrol = props.usercontrol
  const userview = props.userview
  const data = props.school.schools
  const [active, setActive] = useState(false)
  const [editerid, setEditerid] = useState(null)
  const [editerdata, setEditerdata] = useState({})
  const [schoolid, setSchoolid] = useState({})
  const [accs, setAccs] = useState({})
  const [activeSchool, setActiveschool] = useState(0)
  const [collapser, setCollapser] = useState({})

  const [edit, setEdit] = useState('')
  useEffect(() => {
    let params = {
      data:JSON.stringify({}),
      cat:'all',
      table:'schools',
      narration:`get all schools for access control`
    }
    props.getSchools(params);
    
}, [])
useEffect(() => {
    let params = {
      data:JSON.stringify({
          schoolid:activeSchool
      }),
      cat:'select',
      table:'departments',
      narration:`pull all schools department`
    }
    props.getDepartments(params);
    
}, [activeSchool])

  useEffect(() => {
      let params = {
        data:JSON.stringify(
        {
            'staffid':staffid
        }),
        cat:'selectes',
        
        table:'staffaccesss',
        narration:`get all staff access with id ${staffid}`
      }
      props.getStaffaccesss(params);
      
  }, [staffid, props.user])

 
const loadSchool = (e, school) =>{
    //
    let sch = e.target.value;
    let ac = {...accs};
    if(parseInt(sch) === 0)
    {
        //full school access
        let arr = {'school':'full'}
        ac[sch] = arr;
        setAccs(ac)
        setActiveschool(0)
        setCollapser({})
    }
    else if(parseInt(sch) === 1)
    {
        //no school access 
        //remove school
        if(sch in ac)
        {
            delete ac[sch];
        }
        setAccs(ac)
        setActiveschool(0)
        setCollapser({})
    }
    console.log(e.target.value, school);
}
const loadDatax = (e, school) =>{
    console.log(e.target.value, school);
}
const loadSubDatax = (e, school) =>{
    console.log(e.target.value, school);
}
const loadSchoolCollapser = (e, num) =>{
     //full school access
     let sch = e.target.value;
     let ac = {...accs};
     let arr = {'school':'patial'}
     ac[sch] = arr;
     setAccs(ac)
     setActiveschool(num)
     setCollapser({})
  
}
const loadCollapserx = (e, num) =>{
    let cl = {...collapser}
    cl[num] = num in cl && cl[num] == true ? false : true;
    console.log(num, cl)
    setCollapser(cl)
   // console.log(e.target.value, school);
}
let activeSchoolNameArray = data.filter(rw=>rw.id === activeSchool);
let activeSchoolName = activeSchoolNameArray && activeSchoolNameArray.length > 0 ?activeSchoolNameArray[0]:'No School'
  return (
    <>
    <CRow>
    <CCol lg={12}>
        <CCard>
            <CCardHeader>
                
                <CRow>
              <CCol>
              <h5>Access  <small></small></h5>
              </CCol>
              </CRow>
            </CCardHeader>
             <CCardBody>
                <table width='100%'>
                    <thead>
                        <tr>
                            <th>SCHOOL NAME</th>
                            <th className='text-center'>FULL</th>
                            <th className='text-center'>PART</th>
                            <th className='text-center'>NONE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && Array.isArray(data) && data.length > 0 ? data.map((prop, index)=>{
                            return (
                                <tr key={index}> 
                                    <td>
                                        <span style={{textTransform:'uppercase'}}>{prop.name}</span><br/>
                                    </td>
                                    <td width='5%' className='text-center'>
                                        <CInputRadio
                                            name={`school${prop.id}`}
                                            value='0'
                                            onChange={(e)=>loadSchool(e, prop.id)}
                                        />
                                    </td>
                                    <td width='5%' className='text-center'>
                                         <CInputRadio
                                            name={`school${prop.id}`}
                                            value='1'
                                            onChange={(e)=>loadSchool(e, prop.id)}
                                        />
                                    </td>
                                    <td width='5%' className='text-center m-0' >
                                         <button
                                            size='xs'
                                            className='m-auto pt-3 btn btn-link'
                                            onClick={(e)=>loadSchoolCollapser(e, prop.id)}
                                        ><i className='fa fa-gear'></i></button>
                                    </td>
                                </tr>
                            )
                        }):<h4 className='text-center'>No Data</h4>
                    }
                    </tbody>
                </table>
            </CCardBody>
        </CCard>
        </CCol>
    </CRow>
    {activeSchool > 0 ?
    <CRow>
    <CCol lg={12}>
        <CCard>
            <CCardHeader>
                
                <CRow>
              <CCol>
              <h5>MODIFY : {activeSchoolName.name}  <small></small></h5>
              </CCol>
              </CRow>
            </CCardHeader>
                    {
                        controls  ? Object.keys(controls).map((pro, index)=>{
                            let prop = controls[pro]
                            let pdata = controls[pro].data
                            return (
                                <>
                                <CCardBody>
                                <table width='100%'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className='text-center'>FULL</th>
                                        <th className='text-center'>NONE</th>
                                        <th className='text-center'>CONTROLLED</th>
                                    </tr>
                                </thead>
                                 <tbody>
                                <tr key={{index}}> 
                                    <td>
                                        <strong style={{textTransform:'uppercase'}}>{prop.name}</strong><br/>
                                    </td>
                                    <td width='5%' className='text-center'>
                                        <CInputRadio
                                            name={`datax${pro}`}
                                            value='0'
                                            className='m-auto p-auto'
                                            onChange={(e)=>loadDatax(e, pro, prop.id)}
                                        />
                                    </td>
                                    <td width='5%' className='text-center' >
                                         <CInputRadio
                                            name={`datax${pro}`}
                                            value='1'
                                            className='m-auto p-auto'
                                            defaultChecked={true}
                                            onChange={(e)=>loadDatax(e, pro, prop.id)}
                                        />
                                    </td>
                                    <td width='5%' className='text-center m-0' >
                                         <button
                                            size='xs'
                                            className='m-auto pt-3 btn btn-link'
                                            onClick={(e)=>loadCollapserx(e, pro, prop.id)}
                                        ><i className='fa fa-gear'></i></button>
                                    </td>
                                </tr>
                                
                    <CCollapse show={pro in collapser && collapser[pro] && collapser[pro] == true ? true : false }>
                               <table width='100%' className=''>
                               <thead>
                                <tr>
                                    <th></th>
                                    <th className='text-center'>VIEW</th>
                                    <th className='text-center'>MANAGE</th>
                                    <th className='text-center'>NONE</th>
                                </tr>
                    </thead>
                               {Object.keys(pdata).map((pp, ii)=>{
                                 return (
                                    <tr key={ii}> 
                                        <td>
                                            <i style={{textTransform:'uppercase'}}>{pdata[pp]}</i><br/>
                                        </td>
                                        <td width='5%' className='text-center'>
                                            <CInputRadio
                                                name={`sudatax${pp}`}
                                                value='0'
                                                className='m-auto p-auto'
                                                onChange={(e)=>loadSubDatax(e, pp, pro, prop.id)}
                                            />
                                        </td>
                                        <td width='5%' className='text-center' >
                                             <CInputRadio
                                                name={`sudatax${pp}`}
                                                value='1'
                                                className='m-auto p-auto'
                                                defaultChecked={true}
                                                onChange={(e)=>loadSubDatax(e, pp, pro, prop.id)}
                                            />
                                        </td>
                                        <td width='5%' className='text-center' >
                                             <CInputRadio
                                                name={`sudatax${pp}`}
                                                value='1'
                                                className='m-auto p-auto'
                                                defaultChecked={true}
                                                onChange={(e)=>loadSubDatax(e, pp, pro, prop.id)}
                                            />
                                        </td>
                                    </tr>
                                    )
                               })}
                               </table>
                               </CCollapse>
                                </tbody>
                                </table>
                            </CCardBody>
                            
                                </>
                            )
                        }):<h4 className='text-center'>No Data</h4>
                    }
                   
        </CCard>
        </CCol>
    </CRow>:''

    }
</>
  )
}
const mapStateToProps = (state) =>({
    data : state.staffaccessReducer.staffaccesss,
    user : state.userReducer,
    school: state.schoolReducer,
    department: state.departmentReducer,
})
export default connect(mapStateToProps, 
    { 
        getStaffaccesss, 
        deleteStaffaccess, 
        getSchools,
        getDepartments
    })(StaffAccess)
