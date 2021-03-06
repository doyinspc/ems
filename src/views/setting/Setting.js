import React, { useState} from 'react'
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { controls } from '../../actions/common';
import School from './Stage/School';
import Staff from './Stage/Staff';
import Student from './Stage/Student';
import Calendar from './Stage/Calendar';
import Term from './Stage/Term';
import Terms from './Stage/Terms';
import Department from './Stage/Department';
import Unit from './Stage/Unit';
import Subject from './Stage/Subject';
import Theme from './Stage/Theme';
import Admission from './Stage/Admission';
import Timetable from './Stage/Timetable';
import Clasz from './Stage/Clasz';
import Claszunit from './Stage/Claszunit';
import Cbt from './Stage/Cbt';
import Cbtexam from './Stage/Cbtexam';
import Account from './Stage/Account';
import Assessment from './Stage/Ca';
import Assessmentunit from './Stage/Caunit';
import Grade from './Stage/Grade';
import Gradeunit from './Stage/Gradeunit';
import Classallocation from './Stage/Staffclass';
import Subjectallocation from './Stage/Staffsubject';
import Classfee from './Stage/Classfee'
import QuickSetup from './Stage/QuickSetup'
import Week from './Stage/Week';
import Report from './Stage/Report';
import Fee from './Stage/Fee';
import Expense from './Stage/Expense';
import Expenseunit from './Stage/Expenseunit';
import Inventory from './Stage/Inventory';
import Inventoryunit from './Stage/Inventoryunit';
import Maintenance from './Stage/Maintenance';
import Maintenanceunit from './Stage/Maintenanceunit';
import Office from './Stage/Office';
import Job from './Stage/Job';
import Level from './Stage/Level';
import Notice from './Stage/Notice';

const Setting = (props) => {
  const sid = useParams().sid;
  const pid = useParams().pid;
  const qid = useParams().qid;
  const did = useParams().did;
  const kid = useParams().kid;
  const perm = [];
  let cats = controls[2].data;
  const confirm = (sid, perms, Component) =>{
    return Component;
  }

  let acs = props.user.user.access !== undefined && props.user.user.access.length > 0 ? JSON.parse(props.user.user.access) : {};
  let mainedt = 1
  
  //get all access in object form
  if(Object.keys(acs).length > 0 && props.user.isAdmin === false)
  {
      let ids = props.user.activeschool.id;
      
      if(acs !== undefined  && acs.hasOwnProperty(ids))
      {
         
         if(sid in acs[ids][2])
         {
            if(2 in acs[ids][2][sid])
            {
               mainedt = 0
            }
            
         }else
         {
            return <Redirect to="/settings" />
         }

      }else
      {
        return <Redirect to="/settings" />
      }
  }else if(props.user.isAdmin === true) 
  {
     mainedt = 0
  }else{
   return <Redirect to="/settings" />
  }
  

  return (
      <>
        {parseInt(sid) === 1 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Staff edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 2 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Student edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 3 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm, <Calendar edits={mainedt} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Term
              sid={sid}
              pid={pid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 0 &&  parseInt(kid) == 0 ?
        confirm(sid, perm,
           <Terms
              sid={sid}
              pid={pid}
              qid={qid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 1 &&  parseInt(kid) == 0 ?
        confirm(sid, perm,
           <Assessment
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 1 &&  parseInt(kid) > 0 ?
        confirm(sid, perm,
           <Assessmentunit
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              kid={kid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 2 &&  parseInt(kid) == 0?
        confirm(sid, perm,
           <Assessment
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               kid={kid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 2 &&  parseInt(kid) > 0?
        confirm(sid, perm,
           <Assessmentunit
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               kid={kid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
       {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 3 &&  parseInt(kid) == 0?
        confirm(sid, perm,
           <Assessment
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               kid={kid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 3 &&  parseInt(kid) > 0?
        confirm(sid, perm,
           <Assessmentunit
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               kid={kid}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 4?
        confirm(sid, perm,
           <Classallocation
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 5 ?
        confirm(sid, perm,
           <Subjectallocation
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
         
         {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 7?
        confirm(sid, perm,
           <Classfee
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
         {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 10?
        confirm(sid, perm,
           <Week
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 &&  parseInt(did) == 8?
        confirm(sid, perm,
           <QuickSetup
              sid={sid}
              pid={pid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 4 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <School sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 5 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Department sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 5 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Unit
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               edits={mainedt}
               school={props.user.activeschool} 
               para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 6 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Subject sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 6 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Theme
               sid={sid}
               pid={pid}
               qid={qid}
               did={did}
               edits={mainedt}
               school={props.user.activeschool} 
               para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 7 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Admission sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 8 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Timetable sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 9 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Clasz sid={sid} edits={mainedt} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 9 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Claszunit
              pid={pid}
              sid={sid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 10 && parseInt(pid) === 0 && parseInt(qid) === 0 ? 
        confirm(sid, perm, <Account sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 11 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Expense sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 11 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Expenseunit
               pid={pid}
               sid={sid}
               qid={qid}
               did={did}
               edits={mainedt}
               school={props.user.activeschool} 
               para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 12 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Cbt sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 12 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Cbtexam
               pid={pid}
               sid={sid}
               qid={qid}
               did={did}
               edits={mainedt}
               school={props.user.activeschool} 
               para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 13 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Grade sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 13 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Gradeunit
               pid={pid}
               sid={sid}
               qid={qid}
               did={did}
               edits={mainedt}
               school={props.user.activeschool} 
               para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 14 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Report sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 15 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Fee sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 16 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Inventory sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 16 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Inventoryunit
               pid={pid}
               sid={sid}
               qid={qid}
               did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 17 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Maintenance sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 17 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Maintenanceunit
              pid={pid}
              sid={sid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 18 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Office sid={sid} edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 18 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Job
              pid={pid}
              sid={sid}
              qid={qid}
              did={did}
              edits={mainedt}
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 19 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Level sid={sid}edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 20 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Notice sid={sid}edits={mainedt}school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
       </>
    )
}
const mapStateToProps = (state) =>({
    activeTerm : state.termReducer.activeTerm,
    user : state.userReducer,
  })
  
export default connect(mapStateToProps, {
 
})(Setting)
