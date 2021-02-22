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
    CCollapse,
    CSwitch,
    CCardFooter
 } from '@coreui/react';
import { getStaffs,  updateStaff } from './../../actions/staff/staff';
import { getSchools } from './../../actions/setting/school';
import { getDepartments } from './../../actions/setting/department';
import { controls } from '../../actions/common';


const Staff = (props, {match}) => {

  const [id, setId] = useState(null)
  const [accs, setAccs] = useState({})
  const [activeSchool, setActiveschool] = useState(0)
  const [page , setPage] = useState(1)
  const [collapser, setCollapser] = useState({})

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
    if(props.data !== undefined  && props.data !== null && 'id' in props.data && parseInt(props.data.id) > 0 )
    {
        setId(props.data.id)
        if(props.data.access !== undefined && props.data.access.length > 0 ){ setAccs(JSON.parse(props.data.access))}else{setAccs({})}
    }else{
        setAccs({})
    }
}, [props.data])

const handleSubmit = () =>{
    let fd = new FormData()
    fd.append('id', id);
    fd.append('access', JSON.stringify(accs))
    fd.append('cat', 'update');
    fd.append('table', 'staffs');
    fd.append('narration', 'Change Staff access level')
    props.updateStaff(fd)

} 
const loadSchool = (e, school, num) =>{
    //
    let sch = num;
    let ac = {...accs};
    if(parseInt(sch) === 0)
    {
 
        //setCollapser({})
        console.log(e.target.checked)
        if(e.target.checked){
        let cl = 'allcl_'+school;  //get all sub category name
        let al = document.getElementsByClassName(cl);// pull all calsses
        al.forEach(element => {
            let e1 = element.getElementsByTagName('input'); //get the input tag
            e1.forEach(el1 => {
            let vnut = JSON.parse(el1.value) //extract value
            let sub = parseInt(vnut[0])
            let num1 = vnut[1]
            let cl1 = 'mycl_'+sub+"_"+num1;
            let al1 = document.getElementsByClassName(cl1);
            al1.forEach(ele => {
                let el1 = ele.getElementsByTagName('input');
                el1.forEach(el => {
                    let vv = el.value
                    
                    loadSubDataxx(e.target.checked, vv, sub, school, num1 )
                    
                });
            
            })
        })
        });
         }else{
             
              delete ac[school];
            
         }
        setActiveschool(school)
        
    }
    else if(parseInt(sch) === 1)
    {
        //no school access 
        //remove school
        if(sch in ac)
        {
            delete ac[school];
        }
        setAccs(ac)
        setActiveschool(0)
        setCollapser({})
    }
    else if(parseInt(sch) === 2)
    {
        //no school access 
        //remove school
        ac[school] = {};
        setAccs(ac)
        setActiveschool(school)
        setCollapser({})
    }
}
const loadDatax = (e, sub, school, num) =>{
    let cl = 'mycl_'+sub+"_"+num;
    //console.log(cl)
    let al = document.getElementsByClassName(cl);
    al.forEach(element => {
        let e1 = element.getElementsByTagName('input');
        e1.forEach(ele => {
            let v = ele.value
            loadSubDataxx(e.target.checked, v, sub, school, num )
           //ele.checked = e.target.checked
        })
    });
}
const loadSubDatax = (e, sub, family, id, num) =>{
    let ac = {...accs};
    if(e.target.checked)
    {
        if(id in ac)
        {
            if(family in ac[id])
            {
                if(sub in ac[id][family])
                {
                    if(num in ac[id][family][sub])
                    {

                    }else
                    {
                        ac[id][family][sub][num] = num
                    }
                   // ac[id][family][sub] = sub
                }else
                {
                    ac[id][family][sub] = {}
                    ac[id][family][sub][num] = num
                }

            }else
            {
                ac[id][family] = {}
                ac[id][family][sub] = {}
                ac[id][family][sub][num] = num
            }

        }else{
            ac[id] = {}
            ac[id][family] = {}
            ac[id][family][sub] = {}
            ac[id][family][sub][num] = num
        }
    }else
    {
        if(id in ac && family in ac[id] && sub in ac[id][family] && num in ac[id][family][sub])
        {
            delete(ac[id][family][sub][num])
        }
    }
    setAccs(ac)
    console.log(ac)
}
const loadSubDataxx = (e, sub, family, id, num) =>{
    
    let ac = {...accs};
    if(e)
    {
        if(id in ac)
        {
            if(family in ac[id])
            {
                if(sub in ac[id][family])
                {
                    if(num in ac[id][family][sub])
                    {

                    }else
                    {
                        ac[id][family][sub][num] = num
                    }
                   // ac[id][family][sub] = sub
                }else
                {
                    ac[id][family][sub] = {}
                    ac[id][family][sub][num] = num
                }

            }else
            {
                ac[id][family] = {}
                ac[id][family][sub] = {}
                ac[id][family][sub][num] = num
            }

        }else{
            ac[id] = {}
            ac[id][family] = {}
            ac[id][family][sub] = {}
            ac[id][family][sub][num] = num
        }
    }else
    {
        if(id in ac && family in ac[id] && sub in ac[id][family] && num in ac[id][family][sub])
        {
            delete(ac[id][family][sub][num])
        }
    }
    setAccs(ac)
}
const loadPage = (id) =>{
    setActiveschool(id)
    setPage(2)
}
let schs = props.user.mySchoolData ;
let activeSchoolNameArray = schs.filter(rw=>rw.id === activeSchool);
let activeSchoolName = activeSchoolNameArray && activeSchoolNameArray.length > 0 ?activeSchoolNameArray[0]:'No School'
 
return (
    <>
    {page === 1 ?
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
                <table width='100%' border='1px solid black'>
                    <thead>
                        <tr>             
                            <th width='5%' className='text-center'>FULL</th>
                            <th>SCHOOL NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        schs && Array.isArray(schs) && schs.length > 0 ? schs.map((prop, index)=>{
                            let chk1 = accs.hasOwnProperty(prop.id) ? true : false;
                             return (
                                <tr key={index}> 
                                <td width='5%' valign='middle' >
                                        <CSwitch 
                                            className={'mx-1'} 
                                            color={'danger'} 
                                            name='rw'
                                            size='sm'
                                            defaultChecked={chk1}
                                            labelOn={'\u2713'} 
                                            labelOff={'\u2715'} 
                                            onChange={(e)=>loadSchool(e, prop.id, 0, 1)}
                                        /></td>
                                    <td>
                                        <span style={{textTransform:'uppercase'}}><a on>{prop.name}</a></span><br/>
                                    </td>
                                    <td><a onClick={()=>loadPage(prop.id)}>NEXT</a></td>
                                    
                                </tr>
                            )
                        }):<h4 className='text-center'>No Data</h4>
                    }
                    </tbody>
                </table>
            </CCardBody>
            <CCardFooter>
                <button onClick={handleSubmit} className='btn btn-lg btn-block'>Save</button>
            </CCardFooter>
        </CCard>
        </CCol>
    </CRow>
    :''}
    
    {page === 2 && parseInt(activeSchool) > 0 ?
    <CRow>
    <CCol lg={12}>
        <CCard>
            <CCardHeader>
                
                <CRow>
              <CCol>
              <h5>MODIFY : {activeSchoolName.name}  <small></small></h5>
              </CCol>
              <CCol xs={2}>
                  <button onClick={()=>setPage(1)} className='btn btn-icon btn-primary'><i className='fa fa-backward'></i> BACK </button>
              </CCol>
              </CRow>
            </CCardHeader>
                    {
                        controls  ? Object.keys(controls).map((pro, index)=>{
                            let prop = controls[pro]
                            let pdata = controls[pro].data
                            let sl = 'allcl_'+activeSchool
                            return (
                                <>
                                <CCardBody>
                                <table width='100%'>
                                <thead>
                                    <tr>
                                        <th width='5%' className='text-center'>VEIW</th>
                                        <th width='5%' className='text-center'>MANAGE</th>
                                        <th className='text-left'>SECTION</th>
                                    </tr>
                                </thead>
                                 <tbody>
                                <tr className='bg-dark p-10 m-4' key={{index}}> 
                                <td width='5%' valign='middle' >
                                        <CSwitch 
                                            className={`mx-1 ${sl}`} 
                                            color={'success'} 
                                            name='rw1'
                                            size='sm'
                                            value={JSON.stringify([pro, 1])}
                                            labelOn={'\u2713'} 
                                            labelOff={'\u2715'} 
                                            onChange={(e)=>loadDatax(e, pro, activeSchool, 1)}
                                        /></td>
                                    <td width='5%' valign='middle' >
                                        <CSwitch 
                                            className={`mx-1 ${sl}`} 
                                            color={'primary'} 
                                            size='sm'
                                            value={JSON.stringify([pro, 2])}
                                            labelOn={'\u2713'} 
                                            labelOff={'\u2715'} 
                                            onChange={(e)=>loadDatax(e, pro, activeSchool, 2)}
                                        /></td>
                                    <td>
                                        <strong style={{textTransform:'uppercase'}}>{prop.name}</strong><br/>
                                    </td>
                                    
                                </tr>
                                </tbody>
                                </table>
                    <CCollapse show={true }>
                               <table width='100%' className=''>
                               
                    { pdata !== undefined && Array.isArray(Object.keys(pdata)) ? Object.keys(pdata).map((pp, ii)=>{
                                  let d = pdata[pp]
                                  let addx = activeSchool in accs && pro in accs[activeSchool] && pp in accs[activeSchool][pro]  && 1 in accs[activeSchool][pro][pp] ? true : false;
                                  let addy = activeSchool in accs && pro in accs[activeSchool] && pp in accs[activeSchool][pro]  && 2 in accs[activeSchool][pro][pp] ? true : false
                                  let cl = 'mycl_'+pro
                                  
                                   return  <tr key={ii}> 
                                        <td width='5%' valign='middle' >
                                        <CSwitch 
                                            className={`mx-1 ${cl}_1 `} 
                                            color={'success'} 
                                            size='sm' 
                                            value={pp}
                                            sub={pro}
                                            cat={1}
                                            checked={addx}
                                            labelOn={'\u2713'} 
                                            labelOff={'\u2715'} 
                                            onChange={(e)=>loadSubDatax(e, pp, pro, activeSchool, 1)}
                                        /></td>
                                        <td width='5%' className='text-center' >
                                       
                                       <CSwitch 
                                           className={`mx-1 ${cl}_2 `} 
                                           color={'primary'} 
                                           size='sm'
                                           value={pp}
                                           sub={pro}
                                           cat={2}
                                           checked={addy}
                                           labelOn={'\u2713'} 
                                           labelOff={'\u2715'} 
                                           onChange={(e)=>loadSubDatax(e, pp, pro, activeSchool, 2)}
                                       />
                                       
                                       </td>
                                        
                                        <td> <i className="m-auto pb-8" style={{textTransform:'uppercase' }}>
                                            {d.name}</i>
                                        </td>
                                       
                                        
                                           </tr>
                                    
                               }):''}
                               </table>
                               </CCollapse>
                               
                            </CCardBody>
                            
                                </>
                            )
                        }):<h4 className='text-center'>No Data</h4>
                    }
        <CCardFooter>
            <button className='btn btn-block btn-primary' onClick={()=>handleSubmit()}> SAVE</button>
        </CCardFooter>   
        </CCard>
        </CCol>
    </CRow>:''

    }
</>
  )
}
const mapStateToProps = (state) =>({
    user : state.userReducer,
    school: state.schoolReducer,
    department: state.departmentReducer,
})
export default connect(mapStateToProps, 
    { 
        getStaffs, 
        updateStaff, 
        getSchools,
        getDepartments
    })(Staff)
