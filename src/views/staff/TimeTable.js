import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert';
import {getStaffsubjects, getStaffsubject, deleteStaffsubject, updateStaffsubject, registerStaffsubject} from './../../actions/staff/staffsubject';
import {getStaffs} from './../../actions/staff/staff';
import {getTimetables, getTimetable} from './../../actions/setting/timetable';

import Toprow from './TimeTable/Toprow';
import Tablez from './TimeTable/Tablez'
import ListPeriods from './TimeTable/ListPeriods'
import Periods from './TimeTable/Periods'
import { useParams } from 'react-router-dom';
import { CCol, CContainer, CRow } from '@coreui/react';

const TimeTable = (props) => {
    
    const [id, setId] = useState(null)
    const [idz, setidz] = useState(null)
    const [claszid, setClaszid] = useState(null)
    const [subjectid, setSubjectid] = useState(null)
    const [staff, setStaff] = useState(null)
    const [contact, setContact] = useState(null)
    const [dts, setDts] = useState(null)
    const [collapse, setCollapse] = useState(null)
    const [keeper, setkeeper] = useState({})
    const [store, setstore] = useState({})
    const [lstaff, setlstaff] = useState({})
    let sessionid = useParams().sessionid;
    let termid = useParams().termid;
    let groupid = 2;
    let ids = useParams().ids

    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'id':ids
            }),
            cat:'selected',
            table:'timetables',
            narration:'get timetables'
        }
        props.getTimetables(params)
        
      }, [ids])

    useEffect(() => {
        if(props.activeschool !== undefined && parseInt(props.activeschool.id) > 0){
            let params = {
            data:JSON.stringify(
            {
                'schoolid': props.activeschool.id,
                'is_active':0
            }),
            cat:'select',
            table:'staffs',
            narration:'get staffs'
            }
            props.getStaffs(params)
    
        }
      }, [props.activeschool])
    
      
          
      
      const onEdit = (dt) =>{
          setId(dt.id);
          setDts(dt);
          setCollapse(true)
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
      const onReset = () =>{
        setId(null);
        setDts({});
      }
      const onClose = (rw, dt) =>{
        setCollapse(false)
      }

      let claszarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[1] : [];
      let clarray = Array.isArray(claszarray) ? claszarray.filter(rw=>rw !== null).map((rw, ind) =>{
          return <option key={ind} value={rw.id}>{rw.name}</option>
      }):<option></option>
    
      let subjectarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[2] : [];
      let subarray = Array.isArray(subjectarray) ? subjectarray.filter(rw=>rw !== null).map((rw, ind) =>{
          return <option key={ind} value={rw.id}>{rw.name}</option>
      }):<option></option>
     
      let stafarray = props.staffs && Array.isArray(props.staffs) ? props.staffs : [];
      let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
          return <option key={ind} value={rw.id}>{rw.surname} {rw.firstname}</option>
      })

      let subjects_arr = props.staffsubjects && Array.isArray(props.staffsubjects) ? props.staffsubjects : [];
       
     
    return (
        <div className="m-20 p-30 container-fluid" id="maincont" style={{backgroundColor:'white', minHeight:'600px'}} >
            <CRow xs={12} style={{backgroundColor:'red'}}>
                <Toprow      
                    clasz={claszarray.filter(rw=>rw !== null)}
                    sessionid={sessionid}
                    termid={termid}
                    ids={ids}
                />
            </CRow>
            <CRow xs={12}>
            <CCol xs={2}  style={{ height:'100%'}}>
                    <CRow xs={12} style={{height:'600px'}}>
                        <CCol xs={12} className="p-0" style={{height:'600px', overflow:'scroll', backgroundColor:'#000'}}>
                            <ListPeriods
                                sessionid={sessionid}
                                termid={termid}
                                ids={ids}
                                periods={subjects_arr}
                                keeper={keeper}
                                pointStaff={(r)=>setlstaff(r)}
                             />
                        </CCol>
                    </CRow> 
                </CCol>
                <CCol xs={8}>
                    <Tablez 
                        clasz={claszarray.filter(rw=>rw !== null)}
                        keepers={(r)=>setkeeper(r)}
                        sessionid={sessionid}
                        termid={termid}
                        ids={ids}
                        setstore={(e)=>setstore(e)}
                        getlstaff={lstaff}
                    />
                </CCol>
                <CCol xs={2}  style={{ height:'100%'}}>
                    <CRow xs={12} style={{ height:'600px'}}>
                        <CCol xs={12} className="p-1" style={{height:'600px', overflow:'scroll', backgroundColor:'#fff'}}>
                            <Periods
                                periods={props.staffsubjects}
                                sessionid={sessionid}
                                termid={termid}
                                ids={ids}
                             />
                        </CCol>
                    </CRow> 
                </CCol>
            </CRow>
        </div>
    )
}

const mapStateToProps = (state) => ({
    staffsubjects : state.staffsubjectReducer.staffsubjects,
    user:state.userReducer,
    activeschool:state.userReducer.activeschool,
    claszs : state.claszReducer.claszs,
    subjects : state.subjectReducer.subjects,
    staffs : state.staffReducer.staffs ,
    timetables : state.timetableReducer
})

const mapDispatchToProps = {
    getStaffsubjects,
    updateStaffsubject,
    deleteStaffsubject,
    getStaffs,
    registerStaffsubject,
    getTimetables,
    getTimetable
}       

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
