import React, { useState} from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { controls } from '../../actions/common';
import School from './Stage/School';
import Staff from './Stage/Staff';
import Student from './Stage/Student';
import Calendar from './Stage/Calendar';
import Term from './Stage/Term';
import Terms from './Stage/Terms';
import Department from './Stage/Department';
import Subject from './Stage/Subject';
import Admission from './Stage/Admission';
import Timetable from './Stage/Timetable';
import Clasz from './Stage/Clasz';
import Claszunit from './Stage/Claszunit';
import Assessment from './Stage/Department';
import Assessmentunit from './Stage/Department';
import Skill from './Stage/Department';
import Skillunit from './Stage/Department';
import Behavior from './Stage/Department';
import Behaviorunit from './Stage/Department';
import Grade from './Stage/Grade';
import Gradeunit from './Stage/Department';
import Report from './Stage/Department';
import Fee from './Stage/Fee';
import Inventory from './Stage/Inventory';
import Maintenance from './Stage/Maintenance';
import Office from './Stage/Office';
import Level from './Stage/Level';
import Notice from './Stage/Department';

const Setting = (props) => {
  const sid = useParams().sid;
  const pid = useParams().pid;
  const qid = useParams().qid;

  const perm = [];
  let cats = controls[2].data;
  const confirm = (sid, perms, Component) =>{
    return Component;
  }

  return (
      <>
        {parseInt(sid) === 1 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Staff edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 2 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Student edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 3 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm, <Calendar edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Term
              pid={pid}
              edits={0} 
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 3 && parseInt(pid) > 0 &&  parseInt(qid) > 0 ?
        confirm(sid, perm,
           <Terms
              pid={pid}
              qid={qid}
              edits={0} 
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 4 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <School sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 5 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Department sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 6 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Subject sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 7 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Admission sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 8 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Timetable sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 9 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Clasz sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 9 && parseInt(pid) > 0 &&  parseInt(qid) === 0 ?
        confirm(sid, perm,
           <Claszunit
              pid={pid}
              sid={sid}
              edits={0} 
              school={props.user.activeschool} 
              para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} 
            />):''}
        {parseInt(sid) === 10 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Assessment sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 11 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Skill sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 12 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Behavior sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 13 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Grade sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 14 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Report sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 15 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Fee sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 16 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Inventory sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 17 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Maintenance sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 18 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Office sid={sid} edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 19 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Level sid={sid}edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
        {parseInt(sid) === 20 && parseInt(pid) === 0 &&  parseInt(qid) === 0 ? 
        confirm(sid, perm, <Notice sid={sid}edits={0} school={props.user.activeschool} para={cats.filter(rw=>parseInt(rw.id) === parseInt(sid))[0]} />):''}
       </>
    )
}
const mapStateToProps = (state) =>({
    activeTerm : state.termReducer.activeTerm,
    user : state.userReducer,
  })
  
export default connect(mapStateToProps, {
 
})(Setting)
