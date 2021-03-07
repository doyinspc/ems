import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getStaffsubjects, registerStaffsubject, updateStaffsubject,  deleteStaffsubject } from './../../actions/staff/staffsubject';
import { getStaffs } from './../../actions/staff/staff';
import { getSubjects } from './../../actions/setting/subject';
import moment from 'moment';
import { 
    CInput,
    CSelect,
    CFormGroup,
    CLabel,
    CFormText,
    CAlert
 } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Swal from'sweetalert'

const Studentclasss = (props) => {
   let claszid = props.clasz;
   let termid = props.term;
   let sessionid = props.session;
   let groupid = 2;
  
   const [id, setId] = useState(null)
   const [staffid, setstaffid] = useState(null)
   const [subjectid, setsubjectid] = useState(0)
   const [contact, setcontact] = useState(0)
   const [subjectname, setsubjectname] = useState("")
   const [staffname, setstaffname] = useState("")

   useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'termid':termid,
            'itemid':claszid,
            'sessionid':sessionid,
            'grp':2
        }),
        cat:'staffclass',
        table:'accessstaffsubject',
        narration:'get staffsubjects'
        }
    props.getStaffsubjects(params)
    
  }, [termid, sessionid, claszid])

   useEffect(() => {
   
    if(props.user.activeschool !== undefined && props.user.activeschool.hasOwnProperty('id') && parseInt(props.user.activeschool.id) > 0)
    {
      
     let params = {
      data:JSON.stringify(
      {
         typeid:props.user.activeschool.typeid,
          is_active:0
      }),
      cat:'selected',
      table:'subjects',
      narration:'get Subjects'
     }
     props.getSubjects(params)

     let params1 = {
        data:JSON.stringify(
        {
            'schoolid':props.user.activeschool.id,
            is_active:0
        }),
        cat:'selected',
        table:'staffs',
        narration:'get staffs'
       }
       props.getStaffs(params1)
    }
    
  }, [props.user.activeschool])

  const handleSubmit = () =>{
    if(parseInt(staffid) > 0)
    {
      let fd = new FormData();
      fd.append('itemid', claszid);
      fd.append('itemid1', subjectid);
      fd.append('clientid', staffid);
      fd.append('contact', contact);
      fd.append('checker', groupid+'_'+termid+'_'+staffid+'_'+claszid+'_'+subjectid);
      fd.append('table', 'accessstaffsubject');
      fd.append('sessionid', sessionid);
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'updates');
        props.updateStaffsubject(fd)
        
      }else if(termid && parseInt(termid) > 0)
      {
        //INSERT
        fd.append('grp', groupid);
        fd.append('termid', termid);
        fd.append('cat', 'inserts');
        props.registerStaffsubject(fd)
      }
      onEdit(undefined)
    }
  }

  let subjectarray = props.subjects && Array.isArray(props.subjects) ? props.subjects : [];
  let subarray = Array.isArray(subjectarray) ? subjectarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  }):<option></option>
 
  let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.surname}</option>
  })

  const onActivate = (rw, num) =>{
    let nu = parseInt(num) === 0 ? 1 : 0;
    let fd = new FormData();
    fd.append('id', rw);
    fd.append('is_active', nu);
    fd.append('cat', 'updates');
    fd.append('sessionid', props.pid);
    fd.append('table', 'accessstaffclass');
    fd.append('narration', `activate ande disable class ${nu}`);
    props.updateStaffsubject(fd);

  }

  const onEdit = (data) =>{
    if(data !== undefined && parseInt(data.id) > 0)
    {
      let dt = data;
      
      setId(dt.id);
      setstaffid(dt.clientid);
      setstaffname(dt.clientname);
      setsubjectid(dt.itemid1);
      setsubjectname(dt.itemname1);
      setcontact(dt.contact);
    }else{
      setId(null);
      setstaffid('');
      setcontact('');
    }

  }
  
  

  const onDelete = (rw) =>{
    
    Swal("Are you sure you want to delete you will not be able to restore the data.")
    .then((value) => {
      if(value === true && parseInt(rw.id) > 0)
      {
          let fd = new FormData();
          fd.append('id', rw.id);
          fd.append('sessionid', props.pid)
          fd.append('table', 'accessstudentsubject')
          fd.append('cat', 'deletes')
          props.deleteStaffsubject(fd, rw.id);
      }else{
        Swal(`Not deleted`);
      }
      
    });
  }

  
let data = props.staffsubjects && Array.isArray(props.staffsubjects) ? props.staffsubjects.filter(rw =>rw !== null || rw !== undefined) : []
let tabl = data.filter(rw=>rw != null).map((row, ind)=>{
      return <tr key={ind}>
                <td className='text-center'>{ind + 1}</td>
                <td>{parseInt(id) > 0  && parseInt(id) === parseInt(row.id) ? <CFormGroup>
                  <CSelect
                      type="text" 
                      id="nf-staff" 
                      name="staff"
                      onChange={(e)=>setstaffid(e.target.value)}
                      placeholder="" 
                    >
                         <option value={staffid}>{staffname}</option>
                      {starray}
                  </CSelect>
                </CFormGroup> : row.clientname}</td>
                
                <td className='text-left'>
                {parseInt(id) > 0  && parseInt(id) === parseInt(row.id) ? <CFormGroup>
                  <CSelect
                      type="text" 
                      id="nf-subject" 
                      name="subject"
                      onChange={(e)=>setsubjectid(e.target.value)}
                      placeholder="" 
                    >
                        <option value={subjectid}>{subjectname}</option>
                      {subarray}
                  </CSelect>
                </CFormGroup> : row.itemname1}
                </td>
                <td className='text-center'>
                {parseInt(id) > 0  && parseInt(id) === parseInt(row.id)?<CInput 
                      type="number" 
                      id="nf-contact" 
                      name="contactz"
                      value={contact}
                      onChange={(e)=>setcontact(e.target.value)}
                      placeholder="0" 
                    />:
                    row.contact}
                    
                    </td>
                <td></td>
                {parseInt(id) > 0  && parseInt(id) === parseInt(row.id)? 
                <td className='text-center'>
                     <>
                     <a style={{cursor:'pointer'}} className='btn btn-sm' onClick={handleSubmit}>Save</a>
                    <a style={{cursor:'pointer'}} className='btn btn-sm' onClick={()=>onEdit({})}>Clear</a>
                   
                    </>
                </td>:
                <td className='text-center'>
                <>
                    <a style={{cursor:'pointer'}} onClick={()=>onActivate(row.id, row.is_active)}><i className={`fa ${parseInt(row.is_active) == 1 ? 'fa-thumbs-down text-danger' : 'fa-thumbs-up text-success'} ml-2 px-2`}></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                </>
                </td>
                }
              </tr>
  })
  return (
   <>
   <h4>Manage Subject teachers <small>Assign permissions to Subject teachers so they can input scores.</small></h4>
   <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center"> SN.</th>
                    <th><i className='fa fa-users'></i> STAFF NAME</th>
                    <th><i className='fa fa-book'></i> SUBJECT</th>
                    <th><i className='fa fa-clock-o'></i> PERIODS<br/> (PER WEEK)</th>
                    <th><i className='fa fa-blacboard'></i> TIMING</th>
                   <th className="text-center"><i className='fa fa-gear'></i> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                  <tr>
                      <td>ADD</td>
                      <td>
                          <CSelect
                      type="text" 
                      id="nf-staff" 
                      name="staff"
                      onChange={(e)=>setstaffid(e.target.value)}
                      placeholder="" 
                    >
                        <option></option>
                      {starray}
                      </CSelect>
                      </td>
                      <td> <CSelect
                      type="text" 
                      id="nf-subject" 
                      name="subject"
                      onChange={(e)=>setsubjectid(e.target.value)}
                      placeholder="" 
                    >
                        <option></option>
                      {subarray}
                  </CSelect>
                </td>
                      <td>
                      
                      <CInput 
                      type="number" 
                      id="nf-contact" 
                      name="contactz"
                      value={contact}
                      onChange={(e)=>setcontact(e.target.value)}
                      placeholder="0" 
                    />
                      </td>
                      <td></td>
                      <td>
                      <a style={{cursor:'pointer'}} className='btn btn-sm btn-info' onClick={handleSubmit}>Save</a>
                      </td>
                  </tr>
                </tbody>
              </table>
   </>
  )
}

const mapStateToProps = (state) =>({
  subjects : state.subjectReducer.subjects,
  user : state.userReducer,
  staffsubjects : state.staffsubjectReducer.staffsubjects,
  staffs : state.staffReducer.staffs
})
export default connect(mapStateToProps, {
    updateStaffsubject,
    registerStaffsubject,
    deleteStaffsubject,
    getStaffsubjects,
    getStaffs,
    getSubjects
  
  
})(Studentclasss)
